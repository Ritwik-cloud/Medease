import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, John Smith</h2>
      <Card>
        <CardHeader>
          <CardTitle>Patient Summary</CardTitle>
          <CardDescription>Overview of your health</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Recent appointments, vitals, and reports will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
