import { Fragment } from 'react'
import { Dialog as DialogPrimitive, Transition } from '@headlessui/react'

type DialogProps = {
  open: boolean
  onClose: () => void
  afterClose: () => void
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  onClose,
  afterClose,
}) => (
  <Transition show={open} as={Fragment} afterLeave={afterClose}>
    <DialogPrimitive
      onClose={onClose}
      className="fixed inset-0 z-50 mx-auto flex h-screen max-w-xl flex-col justify-center p-6"
    >
      <Transition.Child
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogPrimitive.Overlay className="fixed inset-0 bg-white/50 backdrop-blur-sm dark:bg-black/50" />
      </Transition.Child>
      <Transition.Child
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {children}
      </Transition.Child>
    </DialogPrimitive>
  </Transition>
)
