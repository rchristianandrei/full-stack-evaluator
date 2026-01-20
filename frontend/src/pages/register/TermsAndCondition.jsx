import { ModalContainer } from "../../components/modal/ModalContainer";
import { BackDrop } from "../../components/modal/BackDrop";
import { Modal } from "../../components/modal/Modal";
import { ModalCloseButton } from "../../components/modal/ModalCloseButton";
import { ModalHeader } from "../../components/modal/ModalHeader";

export function TermsAndCondition({ open, onClose }) {
  return (
    <>
      {open && (
        <ModalContainer>
          <BackDrop onClick={onClose}></BackDrop>
          <Modal>
            <ModalCloseButton onClick={onClose}></ModalCloseButton>
            <ModalHeader className="text-center">
              Terms And Conditions
            </ModalHeader>
            <div className="overflow-y-auto h-96">
              <ol className="list-decimal px-2 list-inside flex flex-col gap-2 *:text-justify">
                <p>
                  By submitting this registration form, you agree and consent to
                  the collection, use, disclosure, and processing of your
                  personal data in accordance with this Data Privacy Agreement
                  and the Republic Act No. 10173 (Data Privacy Act of 2012), its
                  Implementing Rules and Regulations, and other applicable
                  issuances of the National Privacy Commission (NPC).
                </p>
                <li>
                  Personal Data We Collect We collect personal data that you
                  voluntarily provide when you register on our website,
                  including but not limited to: Full name Email address Mobile
                  number Username and password Other information you choose to
                  provide You consent that such personal data may be processed
                  reasonably and lawfully for purposes stated in this Agreement.
                </li>
                <li>
                  Purposes of Processing Personal Data Your personal data will
                  be processed for the following legitimate purposes: To create
                  and manage your user account To communicate with you
                  (notifications, updates, confirmations) To improve our
                  services and platform To comply with legal and regulatory
                  requirements You acknowledge that personal data will only be
                  collected and used for specified, explicit, and legitimate
                  purposes, and not further processed in a manner incompatible
                  with these purposes.
                </li>
                <li>
                  Legal Basis for Processing We process your personal data on
                  the basis of: Consent — as provided by you by submitting this
                  form Compliance with legal obligations under Philippine law
                  Legitimate interests in operating and improving our services
                  consistent with applicable data protection principles.
                </li>
                <li>
                  Data Sharing and Disclosure Your personal data may be shared
                  only with third parties if: Required by law, regulation, or
                  legal process; Necessary to protect our rights or safety; or
                  With your explicit consent for specific purposes. Any sharing
                  of personal data will uphold transparency, proportionality,
                  and safeguard protections under the Data Privacy Act.
                </li>
                <li>
                  Data Security & Retention We implement appropriate
                  administrative, technical, and physical safeguards to
                  reasonably protect your personal data from unauthorized
                  access, alteration, disclosure, or destruction. We retain your
                  personal data only as long as necessary to fulfill the
                  purposes stated above or as required by law.
                </li>
                <li>
                  Your Rights as a Data Subject Under Philippine law, you have
                  the right to: Be informed of what personal data we hold about
                  you Access and request a copy of your personal data Correct
                  any inaccurate or incomplete personal data Withdraw your
                  consent or object to processing Erase or block your personal
                  data when applicable Request data portability File a complaint
                  with the National Privacy Commission if you believe your
                  rights have been violated For more information on your rights,
                  visit the NPC website or contact our Data Protection Officer
                  (DPO).
                </li>
                <li>
                  Withdrawal of Consent You have the right to withdraw consent
                  at any time by contacting us. Withdrawal of consent does not
                  affect the lawfulness of processing based on consent before
                  its withdrawal.
                </li>
                {/* <li>
                  Contact Information If you have questions about this Data
                  Privacy Agreement or wish to exercise your rights, please
                  contact: Data Protection Officer (DPO) [Insert Name] Email:
                  [Insert email] Phone: [Insert phone number]
                </li> */}
              </ol>
            </div>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
}
