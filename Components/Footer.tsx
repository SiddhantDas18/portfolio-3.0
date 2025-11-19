import Em99Log from '@/Assets/em99.png'
import Image from 'next/image';

export default function FooterSection() {
    return (
        <footer className="py-20 px-6 border-t border-white/5 mt-20">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h3 className="text-2xl font-bold">Siddhant Das</h3>
                    <p className="text-white/50 text-sm text-center md:text-left max-w-xs">
                        Building digital experiences with a focus on minimalism and performance.
                    </p>
                </div>

                <div className="flex gap-8 text-sm text-white/60">
                    <a href="https://github.com/siddhantdas18" target="_blank" className="hover:text-white transition-colors">GitHub</a>
                    <a href="https://x.com/siddhantspacee" target="_blank" className="hover:text-white transition-colors">Twitter</a>
                    <a href="https://linktr.ee/siddhant05" target="_blank" className="hover:text-white transition-colors">Linktree</a>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
                <p>© {new Date().getFullYear()} Siddhant Das. All rights reserved.</p>
                <p>Designed & Built with Next.js</p>
            </div>
        </footer>
    );
}
