// import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"

// const Footer = () => {
//   return (
//     <footer className="bg-[#1e2130] text-white pt-16 border-t border-gray-800">
//       <div className="container max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Company Info */}
//           <div>
//             <Link to="/" className="inline-block mb-6">
//               <span className="font-bold text-2xl">
//                 <span className="text-sky-600">ed</span>Lern
//               </span>
//             </Link>
//             <p className="text-gray-400 mb-6">
//               Building better communities through innovative technology and meaningful connections.
//             </p>
//             <div className="space-y-3">
//               <div className="flex items-start">
//                 <MapPin className="h-5 w-5 text-sky-600 mr-3 mt-0.5" />
//                 <span className="text-gray-300">123 Community Ave, San Francisco, CA 94107</span>
//               </div>
//               <div className="flex items-center">
//                 <Phone className="h-5 w-5 text-sky-600 mr-3" />
//                 <span className="text-gray-300">+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center">
//                 <Mail className="h-5 w-5 text-sky-600 mr-3" />
//                 <a to="mailto:info@edlern.com" className="text-gray-300 hover:text-white transition-colors">
//                   info@edlern.com
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/features" className="text-gray-300 hover:text-white transition-colors">
//                   Features
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
//                   Pricing
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h3 className="font-semibold text-lg mb-6">Resources</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/help-center" className="text-gray-300 hover:text-white transition-colors">
//                   Help Center
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/community-guidelines" className="text-gray-300 hover:text-white transition-colors">
//                   Community Guidelines
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/tutorials" className="text-gray-300 hover:text-white transition-colors">
//                   Tutorials
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/webinars" className="text-gray-300 hover:text-white transition-colors">
//                   Webinars
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/api-docs" className="text-gray-300 hover:text-white transition-colors">
//                   API Documentation
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/status" className="text-gray-300 hover:text-white transition-colors">
//                   System Status
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="font-semibold text-lg mb-6">Subscribe to Our Newsletter</h3>
//             <p className="text-gray-400 mb-4">
//               Get the latest updates, news and product offerings delivered to your inbox.
//             </p>
//             <div className="flex flex-col space-y-3">
//               <div className="relative">
//                 <Input
//                   type="email"
//                   placeholder="Your email address"
//                   className="bg-[#282c3d] border-gray-700 text-white placeholder:text-gray-500 focus:border-sky-500 focus:ring-sky-500 pr-12 rounded-lg"
//                 />
//                 <Button className="absolute right-1 top-1 h-8 w-8 p-0 flex items-center justify-center bg-sky-500 hover:bg-sky-500 rounded-md">
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               </div>
//               <p className="text-xs text-gray-500">
//                 By subscribing, you agree to our{" "}
//                 <Link to="/privacy" className="text-gray-400 hover:text-white underline">
//                   Privacy Policy
//                 </Link>{" "}
//                 and consent to receive updates.
//               </p>
//             </div>

//             {/* Social Media */}
//             <div className="mt-6">
//               <h4 className="font-medium text-sm mb-3 text-gray-300">Follow Us</h4>
//               <div className="flex space-x-4">
//                 <a
//                   to="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-[#282c3d] hover:bg-sky-500 p-2 rounded-full transition-colors"
//                 >
//                   <Facebook className="h-5 w-5" />
//                 </a>
//                 <a
//                   to="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-[#282c3d] hover:bg-sky-500 p-2 rounded-full transition-colors"
//                 >
//                   <Twitter className="h-5 w-5" />
//                 </a>
//                 <a
//                   to="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-[#282c3d] hover:bg-sky-500 p-2 rounded-full transition-colors"
//                 >
//                   <Instagram className="h-5 w-5" />
//                 </a>
//                 <a
//                   to="https://linkedin.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-[#282c3d] hover:bg-sky-500 p-2 rounded-full transition-colors"
//                 >
//                   <Linkedin className="h-5 w-5" />
//                 </a>
//                 <a
//                   to="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-[#282c3d] hover:bg-sky-500 p-2 rounded-full transition-colors"
//                 >
//                   <Youtube className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 py-8 mt-12">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm mb-4 md:mb-0">
//               © {new Date().getFullYear()} edLern. All rights reserved.
//             </p>
//             <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
//               <Link to="/terms" className="hover:text-white transition-colors">
//                 Terms of Service
//               </Link>
//               <Link to="/privacy" className="hover:text-white transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link to="/cookies" className="hover:text-white transition-colors">
//                 Cookie Policy
//               </Link>
//               <Link to="/accessibility" className="hover:text-white transition-colors">
//                 Accessibility
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer


import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-16 border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              {/* <span className="font-bold text-2xl">
                <span className="text-sky-600">ed</span>Lern
              </span> */}
                            <img src="/logo.png" className='w-24' alt="" />

            </Link>
            <p className="text-gray-600 mb-6">
              Building better communities through innovative technology and meaningful connections.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-sky-600 mr-3 mt-0.5" />
                <span className="text-gray-700">123 Community Ave, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-sky-600 mr-3" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-sky-600 mr-3" />
                <a href="mailto:info@edlern.com" className="text-gray-700 hover:text-gray-900 transition-colors">
                  info@edlern.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link to="/blog" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li> */}
             
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help-center" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Careers
                </Link>
              </li>
              {/* <li>
                <Link to="/tutorials" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Tutorials
                </Link>
              </li> */}
              {/* <li>
                <Link to="/webinars" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Webinars
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-gray-700 hover:text-gray-900 transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-700 hover:text-gray-900 transition-colors">
                  System Status
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Get the latest updates, news and product offerings delivered to your inbox.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-sky-500 focus:ring-sky-500 pr-12 rounded-full"
                />
                <Button className="absolute right-1 top-1 h-7 w-8 p-0 flex items-center justify-center bg-sky-500 hover:bg-sky-600 rounded-full">
                  <ArrowRight className="h-4 w-4 text-white" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our{" "}
                <Link to="/privacy" className="text-gray-700 hover:text-gray-900 underline">
                  Privacy Policy
                </Link>{" "}
                and consent to receive updates.
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3 text-gray-600">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-sky-500 p-2 rounded-full transition-colors"
                >
                  <Facebook className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-sky-500 p-2 rounded-full transition-colors"
                >
                  <Twitter className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-sky-500 p-2 rounded-full transition-colors"
                >
                  <Instagram className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-sky-500 p-2 rounded-full transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-sky-500 p-2 rounded-full transition-colors"
                >
                  <Youtube className="h-5 w-5 text-gray-800" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} edLern. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <Link to="/terms" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="hover:text-gray-900 transition-colors">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="hover:text-gray-900 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
