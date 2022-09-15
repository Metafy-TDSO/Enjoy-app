# IFynd

## 🎯 Objetivo

Esse projeto representa o aplicativo mobile híbrido do projeto IFynd, desenvolvido em React Native com Expo.

## 📱 Executar o aplicativo diretamente pelo celular Android

Você pode instalar e executar o aplicativo diretamente em seu dispositivo **Android** através do [arquivo *.apk*](./apk).


> Obs: Uma aplicação *.ipa* para dispositivos iOS não está disponível no momento.


## 📃 Prerequisitos de Software

Para executar essa aplicaçãoInstall the below tools/packages

| Serial No   | Software           | Versão   | Site de Instalação |
| :---------: | :----------------: | :-------: | :---------------- |
| 1           | Node.js            | >= 16.10.x| [Install NodeJS](https://nodejs.org/en/download/) |
| 2           | Yarn               | >= 1.22   | [Install Yarn](classic.yarnpkg.com/lang/en/docs/install)      |
| 4           | react-native-cli   | >= 2.0.1  | [Install react-native-cli](https://www.npmjs.com/package/react-native-cli) |
| 5           | expo               | >= 46.x   | [Install Expo](https://www.npmjs.com/package/expo) |

<br />

## 🤖 Instruções de Setup

### 🖥️ Configurando o Projeto
1. Clone o repositório com o comando `git clone https://github.com/Metafy-TDSO/IFynd-app.git`
2. Abra um terminal no diretório do projeto
3. Instale as dependências do projeto executando o comando `yarn install`
4. Assim que 'yarn install' estiver completo, execute o comando `yarn start`
5. Se um QR code aparecer no terminal como resultado do comando 'yarn start', você estará pronto para prosseguir!


### 📱 Configurando Mobile

> *Obs: Ignore o primeiro passo dessa sessão caso você já tiver o aplicativo **Expo Go** instalado no seu dispositivo móvel.*


1. Instale o aplicativo 'Expo Go' no seu celular android/iOS. Você pode encontrar os links do aplicativo na sua loja de aplicativos ou [por aqui](https://expo.io/tools#client)
2. Escaneie o QR code exibido no terminal
3. Assim que o QR code for escaneado, levará alguns segundos para seu dispositivo carregar e renderizar o aplicativo.

### 🖥️📱 Configurando Emulador

#### iOS

> *Obs: Você precisa estar em um dispositivo MacOS para realizar esses passos*

1. Instale o [XCode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
2. Abra o **XCode** > **Developer Tools** > **Simulator**
3. Crie um novo dispositivo emulador definindo o nome, tipo de device como IPhone (*ex: IPhone 11*) e a versão de OS

#### Android

1. Instale o [Android Studio e o Android SDK](https://developer.android.com/studio)
2. Abra o **Android Studio** > **More Actions** > **AVD Manager**
3. Crie um novo dispositivo virtual, selecionado um dispositivo (*Ex: Pixel 2*), e instalando e selecionando um OS (*ex: **Q***)
4. Execute o emulador criado

#### Abrindo a aplicação em um emulador pelo Expo

1. Execute o projeto seguindo os passos de **Configurando o Projeto**
2. No terminal, pressione a tecla **'a'** ou **'i'** para abrir a lista de emuladores que irão executar a aplicação
3. Selecione um emulador e aguarde a instalação e execução do app do **Expo Go**.

----

Feito pelo time [Metafy](https://github.com/Metafy-TDSO).
