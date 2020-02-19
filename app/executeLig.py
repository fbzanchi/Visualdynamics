from .config import Config
from datetime import datetime
import subprocess, os, sys, shutil
import errno


def executelig(LogFileName, CommandsFileName, username, filename, itpname, groname, mol):
    LogFile = create_log(LogFileName, username) #cria o arquivo log

    #salvando nome da dinamica para exibir na execução
    f = open(Config.UPLOAD_FOLDER+username+'/'+'namedynamic.txt','w')
    f.write(filename)


    #transferir os arquivos mdp necessarios para a execução
    RunFolder = Config.UPLOAD_FOLDER + username + '/' + filename + '/run/' #pasta q vai rodar
    SecureMdpFolder = os.path.join(os.path.expanduser('~'),Config.MDP_LOCATION_FOLDER)
    MDPList = os.listdir(SecureMdpFolder)

    for mdpfile in MDPList:
        #armazenar o nome completo do arquivo, seu caminho dentro sistema operacional
        fullmdpname = os.path.join(SecureMdpFolder, mdpfile)
        if (os.path.isfile(fullmdpname)):
            shutil.copy(fullmdpname, RunFolder)
    '''
    diretorio = Config.UPLOAD_FOLDER + username + '/info_dynamics'
    try:
        f = open(diretorio,'x+')
        data = '{}-{}-{}-[{}:{}:{}]'.format(datetime.now().day, datetime.now().month, datetime.now().year,
                                            datetime.now().hour, datetime.now().minute, datetime.now().second)
        info = data + ' ' + filename+'\n'
        f.write(info)
        f.close()
    except OSError as e:
        if e.errno == errno.EEXIST:
            f = open(diretorio,'a')
            data = '{}-{}-{}-[{}:{}:{}]'.format(datetime.now().day, datetime.now().month, datetime.now().year,
                                            datetime.now().hour, datetime.now().minute, datetime.now().second)
            info = data + ' ' + filename+'\n'
            f.write(info)
                     
'''
    #abrir arquivo
    with open(CommandsFileName) as f: #CODIGO PARA A PRODUÇÃO
        content = f.readlines()
    lines = [line.rstrip('\n') for line in content if line is not '\n'] #cancela as linhas em branco do arquivo

    for l in lines:
        #estabelecer o diretorio de trabalho
        os.chdir(RunFolder)

        process = subprocess.run(l, shell=True, stdin=LogFile, stdout=LogFile, stderr=LogFile)

        try:
            process.check_returncode()
        except subprocess.CalledProcessError as e:
            LogFile.close()
            return (e.args)
        

def create_log(LogFileName, username):
    #formatando nome do arquivo log
    LogFileName = LogFileName+"-{}-{}-{}[{}:{}:{}]{}".format(datetime.now().year,
                                                            datetime.now().month,
                                                            datetime.now().day,
                                                            datetime.now().hour,
                                                            datetime.now().minute,
                                                            datetime.now().second,
                                                            '.log.txt')
        
    LogFile = open(LogFileName, "w+")
    f = open(Config.UPLOAD_FOLDER+username +'/DirectoryLog', 'w')
    f.write(LogFileName)
    f.close()
    return LogFile
