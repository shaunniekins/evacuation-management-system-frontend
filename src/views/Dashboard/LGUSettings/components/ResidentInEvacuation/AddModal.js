// import React, { useState } from "react";
// import { useDisclosure } from "@chakra-ui/react";
// import {
//   Button,
//   Flex,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Select,
// } from "@chakra-ui/react";
// import { FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { useHistory } from "react-router-dom";
// // import { CalamityAdd } from "api/calamityAPI";
// import { resEvacAdd } from "api/residentInEvacuationAPI";

// import { EvacueeList } from "api/evacueeAPI";

// import { EvacuationCenterList } from "api/evacuationCenterAPI";

// const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
//   const history = useHistory();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const resident = event.target.resident.value;
//     const center = event.target.center.value;
//     const isHead = event.target.isHead.value === "Head" ? "Yes" : "No";
//     const date = event.target.date.value;

//     try {
//       const result = await resEvacAdd(resident, center, isHead, date); // call the API function
//       onClose();
//       history.push("/admin/resident-information");
//     } catch (error) {
//       alert("Failed");
//     }
//   };

//   const residentEntries = EvacueeList();
//   const centerEntries = EvacuationCenterList();

//   const [date, setDate] = useState(new Date());

//   // Format date as "yyyy-mm-dd"
//   const formattedDate = date.toISOString().slice(0, 10);

//   const [unitValue, setUnitValue] = useState("");

//   const handleSelectChange = (event) => {
//     const selectedValue = parseInt(event.target.value);

//     const matchingEntry = residentEntries.find(
//       (entry) => entry.id === selectedValue
//     );

//     if (matchingEntry) {
//       setUnitValue(matchingEntry.is_head === "YES" ? "Head" : "Member");
//     } else {
//       setUnitValue("");
//     }

//     // const selectedOption = event.target.options[event.target.selectedIndex];
//     // const selectedID = selectedOption.getAttribute("data-id");
//     // setItemIDValue(selectedID);
//   };

//   return (
//     <Modal
//       initialFocusRef={initialRef}
//       finalFocusRef={finalRef}
//       isOpen={isOpen}
//       onClose={onClose}
//       closeOnOverlayClick={false}
//       isCentered>
//       <ModalOverlay />
//       <ModalContent>
//         <form onSubmit={handleSubmit}>
//           <ModalHeader>Add Evacuee</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Resident</FormLabel>
//               <Flex justify={"space-between"} gap={2}>
//                 <Select
//                   required
//                   id="resident-field"
//                   name="resident"
//                   placeholder="--Select option--"
//                   onChange={handleSelectChange}>
//                   {residentEntries.map((entry) => (
//                     <option key={entry.id} value={entry.id} data-id={entry.id}>
//                       {`${entry.first_name} ${entry.last_name}`}
//                     </option>
//                   ))}
//                 </Select>
//                 <Input
//                   required
//                   disabled
//                   // w={"2rem"}
//                   type="text"
//                   id="isHead-field"
//                   name="isHead"
//                   ref={initialRef}
//                   placeholder="Function"
//                   w={"30%"}
//                   value={unitValue}
//                 />
//               </Flex>
//               <FormLabel>Evacuation Center</FormLabel>
//               <Flex justify={"space-between"} gap={2}>
//                 <Select
//                   id="center-field"
//                   name="center"
//                   placeholder="--Select option-- (N/A)"
//                   // onChange={handleSelectChange}
//                 >
//                   {centerEntries.map((entry) => (
//                     <option key={entry.id} value={entry.id} data-id={entry.id}>
//                       {entry.name}
//                     </option>
//                   ))}
//                 </Select>
//               </Flex>
//               <FormLabel>Date Received</FormLabel>
//               <Input
//                 required
//                 type="date"
//                 id="date-field"
//                 name="date"
//                 defaultValue={formattedDate}
//                 ref={initialRef}
//                 placeholder="Date Received"
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorscheme="blue" mr={3} type="submit">
//               Add
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </form>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default AddModal;











import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// import { CalamityAdd } from "api/calamityAPI";
import { resEvacAdd } from "api/residentInEvacuationAPI";

import { EvacueeList } from "api/evacueeAPI";

import { EvacuationCenterList } from "api/evacuationCenterAPI";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resident = event.target.resident.value;
    const center = event.target.center.value;
    const isHead = event.target.isHead.value === "Head" ? "HEAD" : "MEMBER";
    const date = event.target.date.value;

    try {
      const result = await resEvacAdd(resident, center, isHead, date); // call the API function
      onClose();
      history.push("/admin/resident-information");
    } catch (error) {
      alert("Failed");
    }
  };

  const residentEntries = EvacueeList();
  const centerEntries = EvacuationCenterList();

  let { userPosition, userBarangay } = useContext(AuthContext);

  const [date, setDate] = useState(new Date());

  // Format date as "yyyy-mm-dd"
  const formattedDate = date.toISOString().slice(0, 10);

  const [unitValue, setUnitValue] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value);

    const matchingEntry = residentEntries.find(
      (entry) => entry.id === selectedValue
    );

    if (matchingEntry) {
      setUnitValue(matchingEntry.is_head === "HEAD" ? "Head" : "Member");
    } else {
      setUnitValue("");
    }

    // const selectedOption = event.target.options[event.target.selectedIndex];
    // const selectedID = selectedOption.getAttribute("data-id");
    // setItemIDValue(selectedID);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add Evacuee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Resident</FormLabel>
              <Flex justify={"space-between"} gap={2}>
                <Select
                  required
                  id="resident-field"
                  name="resident"
                  placeholder="--Select option--"
                  onChange={handleSelectChange}>
                  {residentEntries
                    .filter((entry) => entry.barangay === userBarangay)
                    .map((entry) => (
                      <option
                        key={entry.id}
                        value={entry.id}
                        data-id={entry.id}>
                        {`${entry.first_name} ${entry.last_name}`}
                      </option>
                    ))}
                </Select>

                <Input
                  required
                  disabled
                  // w={"2rem"}
                  type="text"
                  id="isHead-field"
                  name="isHead"
                  ref={initialRef}
                  placeholder="Function"
                  w={"30%"}
                  value={unitValue}
                />
              </Flex>
              <FormLabel>Evacuation Center</FormLabel>
              <Flex justify={"space-between"} gap={2}>
                <Select
                  id="center-field"
                  name="center"
                  placeholder="--Select option-- (N/A)"
                  // onChange={handleSelectChange}
                >
                  {centerEntries
                    .filter((entry) => entry.barangay === userBarangay)
                    .map((entry) => (
                    <option key={entry.id} value={entry.id} data-id={entry.id}>
                      {entry.name}
                    </option>
                  ))}
                </Select>
              </Flex>
              <FormLabel>Date Received</FormLabel>
              <Input
                required
                type="date"
                id="date-field"
                name="date"
                defaultValue={formattedDate}
                ref={initialRef}
                placeholder="Date Received"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
