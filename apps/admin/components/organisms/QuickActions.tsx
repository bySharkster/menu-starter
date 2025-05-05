import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { User, Settings, Calendar } from "lucide-react";

const QuickActions: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start" variant="outline">
          <User className="mr-2 h-4 w-4" />
          Add New User
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configure Settings
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Event
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default QuickActions;
