"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";

type FormCardWrapperModel = {
  children: React.ReactNode;
  headerLabel: string;
};

export const FormCardWrapper = ({
  children,
  headerLabel,
}: FormCardWrapperModel) => {
  return (
    <Card className="w-[450px] max-h-[800px] shadow-md overflow-auto">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
