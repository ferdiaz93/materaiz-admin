#!/bin/bash

# Directorio en el que tengas las carpetas con los archivos de traducción
root_directory="./src/locales/langs/"

# Verificar que el directorio raíz existe
if [ ! -d "$root_directory" ]; then
    echo "Error: El directorio raíz '$root_directory' no existe."
    exit 1
fi

# Array para almacenar nombres de subdirectorios y cantidad de archivos JSON
subdirs=()
json_files=()
json_files_count=()

echo "Chequeando archivos de traducción..."
echo ""
# Recorrer cada subdirectorio y contar los archivos .json
for subdir in "$root_directory"/*/; do
    # Nombre del subdirectorio sin la ruta completa
    subdir_name=$(basename "$subdir")
    subdirs+=("$subdir_name")
    
    # Almacenar los archivos .json en una lista temporal
    files=($(find "$subdir" -maxdepth 1 -name "*.json" -exec basename {} \;))
    json_files+=("${files[@]}")
    json_files_count+=(${#files[@]})
    
    # Imprimir el conteo de archivos JSON en el subdirectorio
    echo "${#files[@]} archivos de traducción encontrados en '$subdir_name'"
    echo ""
done

# Eliminar duplicados de json_files
json_files=($(echo "${json_files[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

# Comprobar si todos los subdirectorios tienen la misma cantidad de archivos .json
expected_count=${json_files_count[0]}
mismatch_found=false
for i in "${!subdirs[@]}"; do
    if [ "${json_files_count[$i]}" -ne "$expected_count" ]; then
        echo "Error: El subdirectorio '${subdirs[$i]}' tiene un número diferente de archivos JSON (${json_files_count[$i]}), se esperaban $expected_count."
        mismatch_found=true
    fi
done

# Si se detectaron discrepancias en la cantidad de archivos JSON, salir con un error
if [ "$mismatch_found" = true ]; then
    echo ""
    echo "Error: Los subdirectorios no tienen la misma cantidad de archivos JSON."
    exit 1
fi

# Variable para controlar si hubo errores en las claves de traducción
key_mismatch_found=false

# Comparar claves en cada archivo JSON en todos los subdirectorios
for json_file in "${json_files[@]}"; do
    # Usar el primer subdirectorio como referencia
    ref_file="$root_directory/${subdirs[0]}/$json_file"

    # Verificar si el archivo de referencia existe
    if [ ! -f "$ref_file" ]; then
        echo "Error: El archivo de referencia '$json_file' no existe en el subdirectorio '${subdirs[0]}'."
        key_mismatch_found=true
        continue
    fi

    # Obtener las claves del archivo de referencia
    ref_keys=$(jq -r 'keys' "$ref_file" 2>/dev/null | sort)

    # Comparar con los archivos en los otros subdirectorios
    for subdir_name in "${subdirs[@]:1}"; do
        file_path="$root_directory/$subdir_name/$json_file"
        
        # Verificar si el archivo existe
        if [ ! -f "$file_path" ]; then
            echo "Error: Falta el archivo $json_file en el subdirectorio '$subdir_name'."
            key_mismatch_found=true
            continue
        fi
        
        # Obtener la lista de claves del archivo actual y comparar con el de referencia
        current_keys=$(jq -r 'keys' "$file_path" 2>/dev/null | sort)
        
        # Encontrar las claves que faltan en el archivo actual en comparación con el de referencia
        missing_keys=$(comm -23 <(echo "$ref_keys") <(echo "$current_keys"))
        
        # Encontrar las claves adicionales en el archivo actual en comparación con el de referencia
        extra_keys=$(comm -13 <(echo "$ref_keys") <(echo "$current_keys"))
        
        if [ -n "$missing_keys" ] || [ -n "$extra_keys" ]; then
            echo "Error: Discrepancia de claves en '$subdir_name/$json_file':"
            [ -n "$missing_keys" ] && echo "Claves faltantes en '$subdir_name/$json_file':" && echo "$missing_keys"
            [ -n "$extra_keys" ] && echo "Claves adicionales en '$subdir_name/$json_file':" && echo "$extra_keys"
            echo ""
            key_mismatch_found=true
        fi
    done
done

# Si hubo errores en las claves de traducción, salir con un código de error
if [ "$key_mismatch_found" = true ]; then
    echo "Error: Se encontraron problemas en las claves de traducción."
    exit 1
fi

echo "Chequeo finalizado sin errores."
