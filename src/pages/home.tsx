import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocalUsersTab, UsersTab } from "@/components";
import { Card, CardContent } from "@/components/ui/card";

export function Home() {
  const [tabs, setTabs] = useState<string>("users");

  return (
    <div className="flex h-screen w-full flex-col gap-6 p-6">
      <header className="flex w-full justify-end">
        <ThemeToggle />
      </header>

      <div className="flex justify-center">
        <Card className="w-full max-w-3xl">
          <CardContent>
            <Tabs value={tabs} onValueChange={setTabs}>
              <TabsList variant="line">
                <TabsTrigger value="users">Usuários</TabsTrigger>
                <TabsTrigger value="local-users">Usuários locais</TabsTrigger>
              </TabsList>
              {tabs === "users" ? <UsersTab /> : <LocalUsersTab />}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
