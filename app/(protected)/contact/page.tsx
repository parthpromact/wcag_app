import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - TRVL",
  description:
    "Get in touch with the TRVL team for inquiries, support, or feedback.",
};
export default function ContactPage() {
  return (
    <div className='min-h-screen p-20 font-semibold'>
      <h1 className='text-3xl'>Contact Us</h1>
    </div>
  )
}
