import Card from "./Card";
function Output() {
  return (
    <div>
      <h2 className="text-slate-100 mb-6 text-center">Documents</h2>
      <div className="flex flex-wrap gap-4 justify-center relative z-[1]">
        <Card
          category="Eng. Store 1.0"
          title="Extract - GCP BigQuery to ADLS (ORC)"
          description="The pipeline below is used to extract data from GCP BigQuery database to a single ORC file in ADLS Gen2."
        />
        <Card
          category="Eng. Store 1.0"
          title="Extract - GCP BigQuery to ADLS (ORC)"
          description="The pipeline below is used to extract data from GCP BigQuery database to a single ORC file in ADLS Gen2."
        />
        <Card
          category="Eng. Store 1.0"
          title="Extract - GCP BigQuery to ADLS (ORC)"
          description="The pipeline below is used to extract data from GCP BigQuery database to a single ORC file in ADLS Gen2."
        />
        <Card
          category="Eng. Store 1.0"
          title="Extract - GCP BigQuery to ADLS (ORC)"
          description="The pipeline below is used to extract data from GCP BigQuery database to a single ORC file in ADLS Gen2."
        />
      </div>
    </div>
  );
}
export default Output;
