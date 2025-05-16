import ImageGallery from "react-image-gallery";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";

const ImageGalleryComponent = ({ open, closeHandler }) => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={closeHandler}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="">
        {/* <DialogHeader>
          <DialogTitle className="text-left text-2xl font-semibold">
            Post a job for free
          </DialogTitle>
          <DialogDescription className="text-left">
            Register, post a job and easily find great talent for your company
            or clients!
          </DialogDescription>
        </DialogHeader> */}
        <div>
          <ImageGallery items={images} />
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryComponent;
