import { notFound } from "next/navigation";
import { serviceCatalog, getAllServices } from "@/lib/serviceCatalog";
import ServiceClient from "./ServiceClient";

export function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = serviceCatalog[params.id];

  if (!service) {
    notFound();
  }

  const isLive = service.availabilityState === "implemented";
  const actionHref = isLive && service.id === "dl-renewal" ? "/dl-renewal" : "/coming-soon";

  // Group documents
  const requiredDocs = service.documentsRequired.filter(d => d.type === 'required');
  const conditionalDocs = service.documentsRequired.filter(d => d.type === 'conditional');
  const optionalDocs = service.documentsRequired.filter(d => d.type === 'optional');

  return (
    <ServiceClient
      service={service}
      isLive={isLive}
      actionHref={actionHref}
      requiredDocs={requiredDocs}
      conditionalDocs={conditionalDocs}
      optionalDocs={optionalDocs}
    />
  );
}
