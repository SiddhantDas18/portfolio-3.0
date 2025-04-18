import Em99Log from '@/Assets/em99.png'
import Image from 'next/image';


export default function FooterSection() {
    const lastUpdatedDate = new Date().toLocaleDateString();

    return (
        <div className="pt-20">
            <div className="flex justify-center items-center text-center">
                <div className="bg-slate-800 h-50 w-90 rounded-t-3xl flex flex-col items-center">
                    <Image 
                        src={Em99Log} 
                        alt='Em99 Logo' 
                        className='h-20 w-auto pt-5' 
                        style={{ objectFit: 'contain' }}
                    />
                    <a 
                        href="mailto:siddhant.physics@gmail.com" 
                        className="mt-6 text-white hover:text-gray-300 transition-colors"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>

            <div className="bg-slate-900 text-white text-center py-4 w-full">
                <p className="text-sm">© {new Date().getFullYear()} Siddhant Das. All rights reserved.</p>
                <p className="text-xs">Last updated: {lastUpdatedDate}</p>
            </div>
        </div>
    );
}
