import Em99Log from '@/Assets/em99.png'
import Image from 'next/image';


export default function FooterSection() {
    const lastUpdatedDate = new Date().toLocaleDateString();

    return (
        <div className="pt-20">
            <div className="flex flex-col md:flex-row justify-center items-center text-center">
                <div className="bg-slate-800 h-50 w-full rounded-t-3xl flex flex-col items-center p-4 md:p-6">
                    <Image 
                        src={Em99Log} 
                        alt='Em99 Logo' 
                        className='h-20 w-auto' 
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

            <div className="bg-slate-900 text-white text-center py-4 w-full flex justify-between items-center px-4 md:px-8">
                <p className="text-sm md:text-base">© {new Date().getFullYear()} Siddhant Das. All rights reserved.</p>
                <p className="text-xs md:text-sm">Last updated: {lastUpdatedDate}</p>
            </div>
        </div>
    );
}
