import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link2 } from 'lucide-react'

const Messaging = () => {
  return (
    <div>
         <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">Adonis Gang</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-0">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src="/placeholder.svg?height=200&width=400&text=Adonis+Gang"
              alt="Community banner"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm">
            Join the #1 masculine self-improvement community. Level up in all areas of your life and finally leave
            Jeffery behind.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link2 className="h-4 w-4" />
            <span>skool.com/adonis-gang</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">181.8k</span>
              <span className="text-xs text-gray-500">Members</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">222</span>
              <span className="text-xs text-gray-500">Online</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">10</span>
              <span className="text-xs text-gray-500">Admins</span>
            </div>
          </div>

          <Button className="w-full">INVITE PEOPLE</Button>
        </CardContent>
      </Card>

    </div>
  )
}

export default Messaging