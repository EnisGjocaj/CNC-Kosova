'use client'

import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Menu, X, ChevronRight, Star, Mail, Phone, MapPin, Check, ArrowRight, Play, Cog, Users, BarChart, Cpu, ChevronLeft } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'


interface ImageProps {
  src: string
  name: string
}

interface ComponentProps {
  images: ImageProps[]
}

export default function Home() {

  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<{ src: string; name: string } | null>(null)
  const [sliderPosition, setSliderPosition] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const slide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      const scrollAmount = containerWidth * 0.8 // Scroll 80% of the container width
      const maxScroll = -(sliderRef.current.scrollWidth - containerWidth)
      
      if (direction === 'left') {
        setSliderPosition(prev => Math.min(prev + scrollAmount, 0))
      } else {
        setSliderPosition(prev => Math.max(prev - scrollAmount, maxScroll))
      }
    }
  }

  
  // const [images, setImages] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const productsRef = useRef(null);
  const technologyRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  // const [selectedImage, setSelectedImage] = useState<{ src: string; name: string } | null>(null);
  
  const scrollToSection = (ref: MutableRefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



// ... existing code ...
useEffect(() => {
  const imageNames = [
    'IMG_2887.JPG', 'IMG_2922.JPG', 'IMG_2924.JPG', 'IMG_2923.JPG', 'IMG_2920.JPG', 'IMG_2918.JPG', 'IMG_2915.JPG', 'IMG_2914.JPG', 'IMG_2913.JPG', 'IMG_2910.JPG', 'IMG_2909.JPG', 'IMG_2908.JPG', 'IMG_2907.JPG', 'IMG_2906.JPG', 'IMG_2905.JPG', 'IMG_2904.JPG', 'IMG_2903.JPG', 'IMG_2900.JPG', 'IMG_2899.JPG', 'IMG_2898.JPG', 'IMG_2895.JPG', 'IMG_2894.JPG', 'IMG_2893.JPG', 'IMG_2890.JPG', 'IMG_2889.JPG', 'IMG_2888.JPG', 'IMG_2891.JPG', 'IMG_2892.JPG', 'IMG_2897.JPG', 'IMG_2902.JPG', 'IMG_2901.JPG', 'IMG_2911.JPG', 'IMG_2912.JPG', 'IMG_2916.JPG', 'IMG_2917.JPG', 'IMG_2919.JPG'
  ]
  const imagePaths = imageNames.map(name => `/images/${name}`)
  setImages(imagePaths)
}, [])

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header')
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('bg-blue-900/80', 'backdrop-blur-sm')
        } else {
          header.classList.remove('bg-blue-900/80', 'backdrop-blur-sm')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <Cpu className="w-8 h-8 mr-2" />
            Kosova CNC
          </Link>
          <nav className="hidden md:flex space-x-6">
            {[
              { name: 'About', ref: aboutRef },
              { name: 'Services', ref: servicesRef },
              { name: 'Products', ref: productsRef },
              { name: 'Technology', ref: technologyRef },
              { name: 'Gallery', ref: galleryRef },
              { name: 'Contact', ref: contactRef },
            ].map(({ name, ref }) => (
              <button
                key={name}
                onClick={() => scrollToSection(ref)}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                {name}
              </button>
            ))}
          </nav>
          <Button variant="outline" className="hidden md:inline-flex text-white border-white hover:bg-white hover:text-blue-900">
            Get a Quote
          </Button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-blue-900 p-4"
          >
            <nav className="flex flex-col space-y-2">
              {['About', 'Services', 'Products', 'Technology', 'Gallery', 'Contact'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-white hover:text-yellow-400 transition-colors">
                  {item}
                </Link>
              ))}
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-blue-900">
                Get a Quote
              </Button>
            </nav>
          </motion.div>
        )}
      </header>

      <main>
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1565439398983-f5e7024a0912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="CNC Machinery"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-blue-900 opacity-60 z-10"></div>
          <div className="container mx-auto px-4 z-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Precision Engineering Redefined</h1>
              <p className="text-xl md:text-2xl mb-8">Cutting-edge CNC solutions for the future of manufacturing</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                Discover Our Technology
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </section>

        <section id="about" ref={aboutRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="CNC Machinery"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Revolutionizing Manufacturing</h2>
                <p className="text-gray-600 mb-4">
                  At CNC Solutions, we're at the forefront of precision engineering. With over two decades of experience, we've been pushing the boundaries of what's possible in CNC technology.
                </p>
                <p className="text-gray-600 mb-6">
                  Our commitment to innovation and quality has made us a trusted partner for businesses across various sectors, from aerospace to medical devices.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Explore Our Journey</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" ref={servicesRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12 text-blue-900"
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Advanced CNC Machining', description: 'Precision machining services for complex parts and components.', icon: Cog },
                { title: 'Custom Machine Development', description: 'Tailored CNC solutions designed for your specific manufacturing needs.', icon: Cpu },
                { title: 'Maintenance & Optimization', description: 'Comprehensive maintenance and performance optimization services.', icon: BarChart },
                { title: 'Training & Consultation', description: 'Expert training and consultation for maximizing CNC efficiency.', icon: Users }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                      <CardTitle className="text-blue-900">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">Learn More</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" ref={productsRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12 text-blue-900"
            >
              Our Product Range
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'High-Precision CNC Milling Machine', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
                { name: 'Multi-Axis CNC Lathe', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
                { name: 'Advanced CNC Router', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-blue-900">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">View Specifications</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" ref={technologyRef} className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Our Technology Edge
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'AI-Powered Precision', description: 'Leveraging artificial intelligence for unparalleled accuracy and efficiency.' },
                { title: 'IoT Integration', description: 'Seamless connectivity for real-time monitoring and predictive maintenance.' },
                { title: 'Advanced Materials Processing', description: 'Capability to work with a wide range of materials, including exotic alloys.' },
                { title: 'Sustainable Manufacturing', description: 'Eco-friendly processes that reduce waste and energy consumption.' },
                { title: 'Rapid Prototyping', description: 'Quick turnaround times for prototypes and small batch productions.' },
                { title: 'Custom Software Solutions', description: 'Tailored software interfaces for intuitive machine control and data analysis.' },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true  }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="bg-blue-800 border-none h-full">
                    <CardHeader>
                      <CardTitle  className="text-yellow-400">{tech.title}</CardTitle>
                      <CardDescription className="text-gray-300">{tech.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          Innovation Showcase
        </h2>
        <div className="relative" ref={sliderRef}>
          <motion.div
            animate={{ x: sliderPosition }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex space-x-4"
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg group flex-shrink-0"
                style={{ width: '300px', height: '200px' }}
              >
                <Image
                  src={src}
                  alt={`Project ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => setSelectedImage({ src, name: `Project ${index + 1}` })}>
                      View Project
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          <Button
            onClick={() => slide('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 z-10"
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => slide('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 z-10"
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
            <DialogDescription>
              {selectedImage && (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>



{/* <section id="gallery" ref={galleryRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 py-10"> 
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12 text-blue-900"
          >
            Innovation Showcase
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg shadow-lg group"
              >
                <Image
                  src={src}
                  alt={`Project ${index + 1}`}
                  width={200} // Significantly reduced width
                  height={200} // Significantly reduced height
                  loading="lazy" // Lazy loading for better performance
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => setSelectedImage({ src, name: `Project ${index + 1}` })}>
                      View Project
                    </button>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedImage?.name}</DialogTitle>
              <DialogDescription>
                <Image
                  src={selectedImage?.src ?? ''}
                  alt={selectedImage?.name ?? ''}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section> */}


        <section id="video-showcase" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12 text-blue-900"
            >
              Video Showcase
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Precision Milling Process", url: "/videos/video1.mp4" },
                { title: "Multi-Axis CNC Operation", url: "/videos/video2.mp4" },
                { title: "Advanced Prototyping", url: "/videos/video3.mp4" },
                { title: "Quality Control Process", url: "/videos/video4.mp4" },
              ].map((video, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
                  onClick={() => setSelectedVideo(video.url)}
                >
                  <div className="aspect-video bg-blue-900 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {video.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Video Showcase</DialogTitle>
              <DialogDescription>
                Watch our CNC machines in action
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video mt-4">
              <video src={selectedVideo || ''} controls className="w-full h-full">
                Your browser does not support the video tag.
              </video>
            </div>
          </DialogContent>
        </Dialog>

        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12 text-blue-900"
            >
              Client Success Stories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
              {[
                { name: 'John Doe', company: 'Aerospace Innovations', quote: 'CNC Solutions has revolutionized our production process. Their machines are top-notch and the support is unparalleled.' },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-blue-900">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold mb-6"
            >
              Ready to Transform Your Manufacturing?
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Let's discuss how our cutting-edge CNC solutions can elevate your production process.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                Schedule a Consultation
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12 text-blue-900"
            >
              Frequently Asked Questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {[
                { question: "What sets your CNC machines apart from competitors?", answer: "Our CNC machines incorporate cutting-edge AI and IoT technologies, offering unparalleled precision, efficiency, and connectivity. We also provide customized solutions tailored to specific industry needs." },
                { question: "Do you offer training for operating your CNC machines?", answer: "Yes, we provide comprehensive training programs for all our CNC machines. Our expert trainers offer both on-site and remote training sessions, ensuring your team can maximize the potential of our technology." },
                { question: "What industries do you primarily serve?", answer: "We serve a wide range of industries including aerospace, automotive, medical devices, electronics, and general manufacturing. Our versatile CNC solutions are adaptable to various production needs and scales." },
                { question: "How do you ensure the quality and precision of your CNC machining?", answer: "We employ a multi-faceted approach to quality assurance, including AI-powered precision control, real-time monitoring systems, and rigorous quality checks throughout the manufacturing process. Our machines are also regularly calibrated to maintain the highest standards of accuracy." },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" ref={contactRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12 text-blue-900"
            >
              Get in Touch
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Send Us a Message</h3>
                <form className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                </form>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Contact Information</h3>
                <p className="flex items-center"><Mail className="mr-2 text-blue-600" /> info@cncsolutions.com</p>
                <p className="flex items-center"><Phone className="mr-2 text-blue-600" /> +1 (555) 123-4567</p>
                <p className="flex items-center"><MapPin className="mr-2 text-blue-600" /> 123 Innovation Drive, Tech City, TC 12345</p>
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-2 text-blue-900">Business Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CNC Solutions</h3>
              <p className="text-gray-400">Pioneering the future of precision manufacturing.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Services', 'Products', 'Technology', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><Mail className="mr-2 h-4 w-4" /> info@cncsolutions.com</li>
                <li className="flex items-center"><Phone className="mr-2 h-4 w-4" /> +1 (555) 123-4567</li>
                <li className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> 123 Innovation Drive, Tech City, TC 12345</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest in CNC technology.</p>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none" />
                <Button type="submit" className="rounded-l-none bg-yellow-500 hover:bg-yellow-600 text-blue-900">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CNC Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}