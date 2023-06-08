import { Modal, Image } from "@/components";
import { LoadingDots } from "@/components/common/loading-dots";

export default function Loading() {
  return (
    <Modal>
      <div className="w-full h-full flex justify-center items-center">
        <LoadingDots className="bg-white" />
      </div>
    </Modal>
  );
}
