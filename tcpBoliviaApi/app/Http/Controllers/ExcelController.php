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

        return response()->json([
            'message' => 'Archivo cargado exitosamente.',
            'file_url' => $url
        ]);
    }
    
    // public function upload(Request $request)
    // {

    //     dd($request->all());
    //     // Validar el archivo recibido, permitiendo CSV y Excel
    //     $request->validate([
    //         'file' => 'required|file|mimes:csv,xlsx,xls|max:20480', // Permite CSV y Excel
    //     ]);
    
    //     $file = $request->file('file');
    
    //     // Depuración del tipo MIME
    //     dd($file->getMimeType());
    
    //     if (!$file) {
    //         return response()->json(['error' => 'No se ha recibido ningún archivo.'], 422);
    //     }
    
    //     if (!$file->isValid()) {
    //         return response()->json(['error' => 'El archivo subido no es válido.'], 422);
    //     }
    
    //     try {
    //         // Procesar el archivo según tu lógica
    //         // Aceptar tanto archivos CSV como Excel
    //         if ($file->getClientOriginalExtension() == 'csv') {
    //             Excel::import(new ExcelImport, $file);
    //         } elseif (in_array($file->getClientOriginalExtension(), ['xlsx', 'xls'])) {
    //             Excel::import(new ExcelImport, $file);
    //         } else {
    //             return response()->json(['error' => 'Tipo de archivo no permitido.'], 422);
    //         }
    
    //         return response()->json(['message' => 'Archivo cargado y datos insertados exitosamente.']);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Error al procesar el archivo: ' . $e->getMessage()], 422);
    //     }
    // }
}