#!/bin/bash
# Execute o comando prebuild com a opção --clean
npx expo prebuild --clean
# Copie o arquivo google-services.json de volta para o diretório correto
cp ./android/app/google-services.json ./android/app/google-services.json