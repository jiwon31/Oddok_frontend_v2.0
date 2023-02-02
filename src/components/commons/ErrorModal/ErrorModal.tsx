import { Modal } from "components/commons";
import { ModalProps } from "../Modal/Modal";

type ErrorModalProps = Pick<ModalProps, "content" | "onClose" | "onAction">;

export default function ErrorModal({ content, onClose, onAction }: ErrorModalProps) {
  return <Modal title="⚠️" content={content} onClose={onClose} onAction={onAction} />;
}
