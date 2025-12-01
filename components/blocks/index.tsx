import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import dynamic from "next/dynamic";

const Content = dynamic(() => import("./content").then((mod) => mod.Content));
const Features = dynamic(() => import("./features").then((mod) => mod.Features));
const Testimonial = dynamic(() => import("./testimonial").then((mod) => mod.Testimonial));
const Video = dynamic(() => import("./video").then((mod) => mod.Video));
const Callout = dynamic(() => import("./callout").then((mod) => mod.Callout));
const Stats = dynamic(() => import("./stats").then((mod) => mod.Stats));
const CallToAction = dynamic(() => import("./call-to-action").then((mod) => mod.CallToAction));
const Gallery = dynamic(() => import("./gallery").then((mod) => mod.Gallery));
const ContactForm = dynamic(() => import("./contact-form").then((mod) => mod.ContactForm));

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksGallery":
      return <Gallery data={block} />;
    case "PageBlocksContactForm":
      return <ContactForm data={block} />;
    default:
      return null;
  }
};
