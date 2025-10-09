import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { fetchContactPage } from "@/lib/homeService"
export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Contact Us - Jerusalem Spiritual Centre",
  description:
    "Get in touch with Jerusalem Spiritual Centre. Find our location, contact details, service times, and frequently asked questions.",
}

export default async function ContactPage() {
  const dynamic = await fetchContactPage()
  const heroTitle = dynamic?.hero_title || "Contact Us"
  const heroDescription = dynamic?.hero_description || "We'd love to hear from you! Whether you have a question, a prayer request, or just want to say hello, feel free to reach out."
  const address1 = dynamic?.address_line1 || "123 Divine Grace Avenue"
  const address2 = dynamic?.address_line2 || "Faith City, FC 12345"
  const country = dynamic?.country || "United Kingdom"
  const mapLink = dynamic?.map_link || "https://www.google.com/maps/search/?api=1&query=Jerusalem+Spiritual+Centre"
  const phoneGeneral = dynamic?.phone_general || "+44 20 1234 5678"
  const phonePrayer = dynamic?.phone_prayer || "+44 20 9876 5432"
  const emailGeneral = dynamic?.email_general || "info@jsc.org"
  const emailPrayer = dynamic?.email_prayer || "prayer@jsc.org"
  const sunday = dynamic?.sunday_service || "Sunday Worship: 10:00 AM - 12:00 PM"
  const wednesday = dynamic?.wednesday_study || "Wednesday Bible Study: 7:00 PM - 8:30 PM"
  const friday = dynamic?.friday_prayer || "Friday Prayer Meeting: 7:00 PM - 8:00 PM"
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{heroTitle}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{heroDescription}</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <MapPin className="h-7 w-7 text-blue-600" /> Our Location
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700">
              <p className="mb-2">{address1},</p>
              <p className="mb-2">{address2}</p>
              <p>{country}</p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Get Directions
              </a>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Phone className="h-7 w-7 text-blue-600" /> Call Us
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700">
              <p className="mb-2">
                General Inquiries:{" "}
                <a href={`tel:${phoneGeneral.replace(/\s/g,'')}`} className="text-blue-600 hover:underline">{phoneGeneral}</a>
              </p>
              <p>
                Prayer Line:{" "}
                <a href={`tel:${phonePrayer.replace(/\s/g,'')}`} className="text-blue-600 hover:underline">{phonePrayer}</a>
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Mail className="h-7 w-7 text-blue-600" /> Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700">
              <p className="mb-2">
                General:{" "}
                <a href={`mailto:${emailGeneral}`} className="text-blue-600 hover:underline">{emailGeneral}</a>
              </p>
              <p>
                Prayer Requests:{" "}
                <a href={`mailto:${emailPrayer}`} className="text-blue-600 hover:underline">{emailPrayer}</a>
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Clock className="h-7 w-7 text-blue-600" /> Service Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700">
              <p className="mb-2">{sunday}</p>
              <p className="mb-2">{wednesday}</p>
              <p>{friday}</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                What should I expect on my first visit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-base">
                You can expect a warm welcome, uplifting worship, and a relevant message from the Bible. We have
                programs for all ages, including a vibrant children's ministry. Feel free to come as you are!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                Do you have programs for children and youth?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-base">
                Yes, we offer engaging and age-appropriate programs for children and youth during our Sunday services.
                Our dedicated teams ensure a safe and fun environment for them to learn and grow in faith.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                How can I get involved in a ministry?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-base">
                We have various ministries you can join, from worship and outreach to community service and teaching.
                Please visit our "Ministries" page or speak to one of our ushers after service to learn more and sign
                up.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                Is there a dress code for services?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-base">
                No, there is no specific dress code. We encourage you to wear whatever makes you feel comfortable.
                You'll see a mix of casual and more formal attire.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  )
}
