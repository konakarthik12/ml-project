import Layout from "@/components/Layout";

export default function Segment() {

  return (
    <iframe src="/annotator/index.html" className="m-10 flex-1 h-screen" scrolling="no"/>
  );
}

Segment.layout = Layout;