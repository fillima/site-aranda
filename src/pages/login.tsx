import Image from "next/image"
import logoAranda from "@/assets/aranda-logo.png"
import logoGoogle from "@/assets/google.svg"

export default function Login() {
    return (
      <div className="bg-blue">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-12 w-auto"
              src={logoAranda}
              alt="Aranda"
            />
            <h2 className="mt-6 text-center text-3xl font-semibold text-gray-200">Acesse sua conta da Aranda</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <Image 
                      src={logoGoogle}
                      alt="Login Google"
                      className="mr-5 w-8 h-8"
                    />
                    Login com o Google
                  </button>
                </div>
              </form>
  
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Vendas Aranda</span>
                  </div>
                </div>
  
                <div className="flex flex-col text-center mt-4">
                  <p className="text-gray-600"><b>Atenção!</b></p>
                  <p className="text-gray-500">Acesse com sua conta da Aranda, nenhuma outra conta será aceita para acessar o sistema!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  