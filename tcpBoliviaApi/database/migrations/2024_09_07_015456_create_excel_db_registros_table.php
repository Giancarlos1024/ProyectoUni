<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExcelDbRegistrosTable extends Migration
{
    /**
     * Ejecuta las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('excel_db_registros', function (Blueprint $table) {
            $table->id(); // Crea una columna 'id' de tipo BIGINT AUTO_INCREMENT PRIMARY KEY
            $table->string('numres2');
            $table->date('res_fecha');
            $table->string('res_tipo', 100);
            $table->string('res_tipo2', 100);
            $table->integer('res_fondo_voto');
            $table->string('resresul', 100);
            $table->string('revresul', 100);
            $table->string('resfinal', 100);
            $table->string('relator', 100);
            $table->decimal('restiempo', 5, 2); // DECIMAL(5,2)
            $table->string('caso_id', 100);
            $table->string('sala', 100);
            $table->string('acción_const', 100);
            $table->string('acción_const2', 100);
            $table->string('res_emisor', 100);
            $table->string('departamento_id', 100);
            $table->string('municipio_id', 100);
            $table->date('fecha_ingreso')->nullable(); // NULLABLE date column

            $table->timestamps(); // Si quieres agregar created_at y updated_at
        });
    }

    /**
     * Revierte las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('excel_db_registros');
    }
}
