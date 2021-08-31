import { useCartSlide } from "../hooks/use-cart-slide.js";
export default function Testimonial() {
  const { testimonial, updateTestimonial } = useCartSlide();
  return (
    <>
      {testimonial && (
        <div className="relative bg-tan">
          <div className="wide-load flex flex-col md:flex-row py-2">
            <div className="w-1/4 hidden md:block"></div>
            <div className="w-full md:w:3/4 h-full">
              <blockquote className="testimonial relative">
                <div className="ml-12 my-8">
                  <p className="prose text-2xl font-semibold mb-6">
                    What our customers are saying
                  </p>
                  <div
                    className="prose text-xl"
                    dangerouslySetInnerHTML={{ __html: testimonial }}
                  />
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
