import { Modal } from "components/commons";
import useAuth from "hooks/useAuth";

export default function AccountDeleteModal({ onClose }: { onClose: () => void }) {
  const { deleteAccount } = useAuth();

  return (
    <Modal
      title="계정 삭제"
      content="ODDOK 계정을 삭제하시겠습니까?"
      onClose={onClose}
      onAction={{ text: "삭제하기", action: deleteAccount.mutate }}
    />
  );
}
