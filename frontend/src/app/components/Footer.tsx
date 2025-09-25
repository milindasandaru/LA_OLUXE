// Footer component: centered content with full-width bottom bar

const Footer = () => {
    return (
        <footer className="bg-transparent mt-20 text-sm">
            {/* Main centered content */}
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-8">
                <div>
                    <h3 className="mb-4 text-2xl font-semibold">Adora.lk</h3>
                    <p className="text-gray-600 md:w-2/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repellendus aperiam iure assumenda itaque libero, eaque neque officiis exercitationem reiciendis!</p>

                            <div className="flex items-center gap-4 mt-4">
                                <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-[#1877F2] transition-colors duration-200" target="_blank" rel="noreferrer">
                            <i className="ri-facebook-circle-line text-2xl"></i>
                        </a>

                        <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-[#1877F2] transition-colors duration-200" target="_blank" rel="noreferrer">
                            <i className="ri-twitter-x-line text-2xl"></i>
                        </a>

                        <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-[#1877F2] transition-colors duration-200" target="_blank" rel="noreferrer">
                            <i className="ri-instagram-line text-2xl"></i>
                        </a>

                        <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-[#1877F2] transition-colors duration-200" target="_blank" rel="noreferrer">
                            <i className="ri-linkedin-box-line text-2xl"></i>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5">Quick Links</h3>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5">Customer Service</h3>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>FAQ</li>
                        <li>Shipping & Returns</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
            </div>

            {/* bottom full-width bar */}
            <div className="w-full mt-8">
                <hr className="border-gray-200" />
                <div className="max-w-6xl mx-auto px-4">
                    <p className='py-5 text-xs text-center text-gray-500'>
                        © {new Date().getFullYear()} Adora.lk — All rights reserved.
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer;