import io
import os
import shutil
import zipfile
from flask_restful import Resource
from flask import request, send_file
from server.config import Config


class DownloadDynamicFigures(Resource):
    def get(self):
        args = request.args

        username = args["username"]
        molecule = args["molecule"]
        simtype = args["type"]
        timestamp = args["timestamp"]

        SIMULATION_FOLDER_PATH = os.path.join(Config.UPLOAD_FOLDER, username, simtype, molecule, timestamp)

        if os.path.exists(SIMULATION_FOLDER_PATH):
            SIMULATION_RUN_FOLDER_PATH = os.path.join(SIMULATION_FOLDER_PATH, "run")
            SIMULATION_FIGURES_FOLDER_PATH = os.path.join(SIMULATION_FOLDER_PATH, "figures")
            SIMULATION_FIGURES_ZIP_PATH = os.path.join(SIMULATION_FIGURES_FOLDER_PATH, "figures.zip")

            simulation_data = SIMULATION_FOLDER_PATH.split("/")[::-1]

            for folder, _, files in os.walk(SIMULATION_RUN_FOLDER_PATH):
                for file in files:
                    if file.endswith(".xvg"):
                        file = os.path.join(SIMULATION_RUN_FOLDER_PATH, file)
                        shutil.move(file, SIMULATION_FIGURES_FOLDER_PATH)

            with zipfile.ZipFile(SIMULATION_FIGURES_ZIP_PATH, "w") as z:
                for folder, _, files in os.walk(SIMULATION_FIGURES_FOLDER_PATH):
                    for file in files:
                        if not file.endswith(".zip"):
                            z.write(
                                os.path.join(folder, file),
                                file,
                                compress_type=zipfile.ZIP_DEFLATED,
                            )
            
            stripped_timestamp_folder = simulation_data[0].replace("\n", "")
            download_filename = f"{simulation_data[2]}|{simulation_data[1]}|{stripped_timestamp_folder}|figures.zip"

            return send_file(
                SIMULATION_FIGURES_ZIP_PATH, as_attachment=True, download_name=download_filename
            )
        
        # Use BytesIO instead of StringIO here.
        buffer = io.BytesIO()
        buffer.write(b'The simulation you\'re trying to retrieve was not found')
        # Or you can encode it to bytes.
        # buffer.write('Just some letters.'.encode('utf-8'))
        buffer.seek(0)
        return send_file(
            buffer,
            as_attachment=True,
            download_name='simulation-not-found.txt',
            mimetype='text/txt'
        )
