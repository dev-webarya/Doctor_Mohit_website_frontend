import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      src: '/image.png',
      alt: 'Clinic Interior - Modern Pediatric Facility',
      category: 'Clinic',
      title: 'Modern Clinic Facility',
      description: 'State-of-the-art equipment and child-friendly environment',
      isVideo: false
    },
    {
      src: '/image copy.png',
      alt: 'Pediatric Care Services',
      category: 'Services',
      title: 'Pediatric Care',
      description: 'Comprehensive outpatient consultations',
      isVideo: false
    },
    {
      src: '/image_one.png',
      alt: 'Professional Medical Facility - Advanced Healthcare Environment',
      category: 'Facilities',
      title: 'Advanced Medical Environment',
      description: 'Cutting-edge diagnostic and treatment facilities',
      isVideo: false
    },
    {
      src: '/image_two.png',
      alt: 'Dedicated Patient Care Area - Comfortable Clinic Space',
      category: 'Clinic',
      title: 'Patient Care Area',
      description: 'Comfortable and welcoming consultation spaces',
      isVideo: false
    },
    {
      src: '/image_three.png',
      alt: 'Medical Equipment & Technology - Professional Healthcare Setup',
      category: 'Equipment',
      title: 'Modern Medical Technology',
      description: 'Latest diagnostic equipment for comprehensive healthcare',
      isVideo: false
    },
    // {
    //   // src: '/video_one1.mp4',
    //   alt: 'Care & Cure Centre - Professional Video Tour',
    //   category: 'Video',
    //   title: 'Facility Tour Video',
    //   description: 'Comprehensive walkthrough of our advanced medical facility',
    //   isVideo: true
    // },
    // {
    //   // src: '/video_one2.mp4',
    //   alt: 'Care and Cure Patient Testimonials - Success Stories',
    //   category: 'Video',
    //   title: 'Patient Success Stories',
    //   description: 'Inspiring testimonials from our satisfied patients and families',
    //   isVideo: true
    // },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <Layout>
      <Helmet>
        <title>Gallery | Care and Cure Fertility Centre - Clinic Photos & Team</title>
        <meta name="description" content="View our modern clinic facilities, expert doctors, and professional healthcare environment at Care and Cure Fertility Centre in Bangalore." />
        <meta name="keywords" content="clinic photos, facility tour, doctor team, healthcare environment, pediatric clinic" />
        <meta property="og:title" content="Gallery | Care and Cure Fertility Centre" />
        <meta property="og:description" content="Explore our clinic facilities and meet our expert medical team." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://careandcure.com/gallery" />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-medical-blue-light via-background to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-lg text-muted-foreground">
              Explore our modern clinic facilities, expert medical team, and professional healthcare environment dedicated to caring for your family.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-12 bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video bg-gray-200 relative">
                {galleryImages[currentIndex].isVideo ? (
                  <video
                    src={galleryImages[currentIndex].src}
                    className="w-full h-full object-cover"
                    controls
                    controlsList="nodownload"
                  />
                ) : (
                  <img
                    src={galleryImages[currentIndex].src}
                    alt={galleryImages[currentIndex].alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <p className="text-primary text-sm font-semibold mb-2">{galleryImages[currentIndex].category}</p>
                <h3 className="text-white text-2xl font-bold mb-2">{galleryImages[currentIndex].title}</h3>
                <p className="text-white/90">{galleryImages[currentIndex].description}</p>
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                    index === currentIndex ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                  }`}
                >
                  {image.isVideo ? (
                    <>
                      <video
                        src={image.src}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container mx-auto container-padding">
          <h2 className="text-3xl font-bold mb-10 text-center">Complete Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden group cursor-pointer">
                    {image.isVideo ? (
                      <>
                        <video
                          src={image.src}
                          className="w-full h-full object-cover group-hover:brightness-75 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Play className="w-12 h-12 text-white fill-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white font-semibold">View</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-primary text-sm font-semibold mb-1">{image.category}</p>
                    <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                    <p className="text-muted-foreground text-sm">{image.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Experience Excellence in Healthcare</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Visit our state-of-the-art facility and meet our expert medical team. We're committed to providing compassionate, professional care for your entire family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Schedule a Visit
                </button>
              </a>
              <a href="/contact">
                <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                  Get in Touch
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
