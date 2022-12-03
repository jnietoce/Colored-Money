import { Modal } from "@components/ui/common"
import { useEffect, useState } from "react"
import { Button } from "@components/ui/common"

export default function ErrorModal({isError}) {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(!!isError) {
            setIsOpen(true)
        }
        else {
            setIsOpen(false)
        }
        
    }, [isError])

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <Modal isOpen={isOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            {isError.title}
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            {isError.errorMessage}
                        </p>
                        </div>                       
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button 
                        onClick={closeModal}
                        variant = "red">
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    )
}