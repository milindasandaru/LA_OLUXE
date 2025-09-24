// import { assets } from '../asstes/assets'

const Footer = () => {
    return (
    <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

            <div className="">
                <h3 className="mb-5 text-2xl font-semibold">Adora.lk</h3>
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repellendus aperiam iure assumenda itaque libero, eaque neque officiis exercitationem reiciendis! Optio asperiores, tenetur dignissimos delectus id adipisci nostrum sint culpa.
                </p>
            </div>

            <div className="">
                <h3 className="mb-5">Quick Links</h3>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="">
                <h3 className="mb-5">Customer Service</h3>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>FAQ</li>
                    <li>Shipping & Returns</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>

            <div className="">
                <h3 className="mb-5">Follow Us</h3>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    <li>LinkedIn</li>
                </ul>
            </div>

            <div>
                <hr className="border-gray-200" />
                <p className='py-5 text-xs text-center text-gray-500'>
                    © {new Date().getFullYear()} Adora.lk — All rights reserved.
                </p>
            </div>

        </div>
    )
}

export default Footer;