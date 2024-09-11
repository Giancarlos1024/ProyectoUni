<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ExcelImport;

class ExcelController extends Controller
{
    public function upload(Request $request)
    {
        // Validar el archivo recibido
        $request->validate([
            'file' => 'required|file|max:20480', // Permite cualquier tipo de archivo hasta 20MB
        ]);

        $file = $request->file('file');

        if (!$file) {
            return response()->json(['error' => 'No se ha recibido ningún archivo.'], 422);
        }

        if (!$file->isValid()) {
            return response()->json(['error' => 'El archivo subido no es válido.'], 422);
        }

        // Guardar el archivo en el almacenamiento público en la carpeta "uploads"
        $path = $file->store('uploads', 'public');

        // Obtener la URL del archivo almacenado
        $url = Storage::url($path);

        try {
            // Procesar el archivo CSV y guardar los datos en la base de datos
            Excel::import(new ExcelImport, $file);

            return response()->json([
                'message' => 'Archivo cargado y datos insertados exitosamente.',
                'file_url' => $url
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al procesar el archivo: ' . $e->getMessage()], 422);
        }
    }
}
