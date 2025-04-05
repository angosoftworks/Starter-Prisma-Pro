import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

export default async function DSLPage() {
  const res = await fetch("http://localhost:3000/api/upload-dsl", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  const dslList: string[] = data.dslList || [];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" />
          DSL Reçus
        </h1>

        {dslList.length === 0 ? (
          <div className="text-gray-500">Aucun DSL encore reçu.</div>
        ) : (
          <ScrollArea className="space-y-4 max-h-[600px] pr-2">
            {dslList.map((dsl, i) => (
              <Card key={i} className="shadow-sm bg-white border border-gray-200">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-base font-semibold text-gray-700">
                    DSL #{i + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
                    {dsl}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        )}
      </div>
    </main>
  );
}
