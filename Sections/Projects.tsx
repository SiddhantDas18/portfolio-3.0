export default function Projects() {
    return <section className="py-10 px-10 md:px-40" id="projects">
        <div>
            <div>
                <p className="bg-grad">Projects</p>
            </div>

            <div className="pt-5">
                <div>
                    
                    <a href="https://github.com/SiddhantDas18/Colaborative-compiler" target="blank"><h1 className="text-xl">Collaborative Code Editor</h1></a>
                    <p className="pt-2 pl-2 opacity-70">Collaborative code editor made using React, where we can create roomId and join them. And can collaboratively edit our Code</p>
                </div>

                <div className="pt-2 mt-2">
                    <a href="https://solana-wallet-blond.vercel.app/" target="blank" className="text-xl"><h1>Solana WEB3 Wallet (Live)</h1></a>
                    <p className="pt-2 pl-2 opacity-70">Solana WEB3 wallet Where you can create your Solana Wallet or can add your Wallet from your very own Mnemonics. Also you can see how much of solana do you have in your wallet.</p>
                </div>

                <div className="pt-2 mt-2">
                    <a href="https://github.com/SiddhantDas18/BasicUI-Rewritting" target="blank" className="text-xl"><h1>Typing UI</h1></a>
                    <p className="pt-2 pl-2 opacity-70">Rich Ui element just like the one below.</p>
                </div>

                <div className="pt-2 mt-2">
                    <a href="https://todo-geogo.vercel.app/" target="blank" className="text-xl"><h1>Todo Application (Live)</h1></a>
                    <p className="pt-2 pl-2 opacity-70">Built with Prisma and Next.js, featuring complete CRUD operations for managing tasks efficiently.</p>
                </div>

            </div>
        </div>
    </section>
}