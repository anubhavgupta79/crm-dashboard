import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Aeon CRM Dashboard</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">Marci</p>
          <p className="text-xs text-muted-foreground">Welcome back</p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://placehold.co/40x40" alt="User Avatar" data-ai-hint="person portrait" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
