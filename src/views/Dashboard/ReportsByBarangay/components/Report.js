import { EvacueeReport, BarangayReportItem } from "api/reportAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

import { resEvacList } from "api/residentInEvacuationAPI";
import { EvacueeList } from "api/evacueeAPI";
import { EvacuationCenterList } from "api/evacuationCenterAPI";

export const GenderReport = ({ startDate, endDate }) => {
  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const evacList = resEvacList().filter((entry) => {
    if (startDate && endDate) {
      const date = new Date(entry.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    }
    return true;
  });
  const evacueeList = EvacueeList();

  let maleNum = 0;
  let femaleNum = 0;

  if (!isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find(
        (e) => e.id === residentId && e.barangay === userBarangay
      );
      if (evacuee) {
        if (evacuee.gender.toLowerCase() === "male") maleNum++;
        else if (evacuee.gender.toLowerCase() === "female") femaleNum++;
      }
    }
  }

  if (isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find((e) => e.id === residentId);
      if (evacuee) {
        if (evacuee.gender.toLowerCase() === "male") maleNum++;
        else if (evacuee.gender.toLowerCase() === "female") femaleNum++;
      }
    }
  }

  const data = [
    { gender: "Male", count: maleNum },
    { gender: "Female", count: femaleNum },
  ];

  return (
    <Flex direction={"row"} justify={"space-between"}>
      <Flex w={"100%"}>
        <Table colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Gender</Th>
              <Th>Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>Male</Th>
              <Td>{maleNum}</Td>
            </Tr>
            <Tr>
              <Th>Female</Th>
              <Td>{femaleNum}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <Flex w={"100%"}>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="gender" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#BEE3F8" />
        </BarChart>
      </Flex>
    </Flex>
  );
};

export const BarangayReport = ({ startDate, endDate }) => {
  const evacueeEntries = EvacueeReport();
  const barangayEntries = BarangayReportItem();

  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const evacList = resEvacList().filter((entry) => {
    if (startDate && endDate) {
      const date = new Date(entry.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    }
    return true;
  });
  const evacueeList = EvacueeList();

  const barangayCounts = {};

  if (!isAdmin) {
    evacList.forEach((evac) => {
      const evacuee = evacueeList.find((e) => e.id === evac.resident);
      if (evacuee) {
        const barangay = evacuee.barangay;
        if (barangay == userBarangay) {
          if (barangay in barangayCounts) {
            barangayCounts[barangay]++;
          } else {
            barangayCounts[barangay] = 1;
          }
        }
      }
    });
  }

  if (isAdmin) {
    evacList.forEach((evac) => {
      const evacuee = evacueeList.find((e) => e.id === evac.resident);
      if (evacuee) {
        const barangay = evacuee.barangay;
        if (barangay in barangayCounts) {
          barangayCounts[barangay]++;
        } else {
          barangayCounts[barangay] = 1;
        }
      }
    });
  }

  const data = Object.keys(barangayCounts).map((name) => ({
    name,
    count: barangayCounts[name],
  }));

  return (
    <Flex direction={"row"} justify={"space-between"}>
      <Flex w={"100%"}>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Barangay</Th>
              <Th>Number</Th>
            </Tr>
          </Thead>

          <Tbody>
            {Object.keys(barangayCounts).map((name) => (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td>{barangayCounts[name]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <Flex w={"100%"}>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#BEE3F8" />
        </BarChart>
      </Flex>
    </Flex>
  );
};

export const PWDReport = ({ startDate, endDate }) => {
  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const evacList = resEvacList().filter((entry) => {
    if (startDate && endDate) {
      const date = new Date(entry.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    }
    return true;
  });
  const evacueeList = EvacueeList();

  let pwdNum = 0;
  let notPwdNum = 0;

  for (let i = 0; i < evacList.length; i++) {
    const residentId = evacList[i].resident;
    const evacuee = evacueeList.find((e) => e.id === residentId);
    if (evacuee) {
      if (!isAdmin && evacuee.barangay !== userBarangay) {
        continue;
      }
      if (evacuee.is_pwd.toLowerCase() === "pwd") {
        pwdNum++;
      } else {
        notPwdNum++;
      }
    }
  }

  const data = [
    { name: "PWD", count: pwdNum },
    { name: "Not PWD", count: notPwdNum },
  ];

  return (
    <Flex direction={"row"} justify={"space-between"}>
      <Flex w={"100%"}>
        <Table colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Number</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Th>PWD</Th>
              <Td>{pwdNum}</Td>
            </Tr>
            <Tr>
              <Th>Not PWD</Th>
              <Td>{notPwdNum}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <Flex>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#BEE3F8" />
        </BarChart>
      </Flex>
    </Flex>
  );
};

export const IPReport = ({ startDate, endDate }) => {
  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const evacList = resEvacList().filter((entry) => {
    if (startDate && endDate) {
      const date = new Date(entry.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    }
    return true;
  });
  const evacueeList = EvacueeList();

  let ipNum = 0;
  let nonIpNum = 0;

  if (!isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find(
        (e) => e.id === residentId && e.barangay === userBarangay
      );
      if (evacuee) {
        if (evacuee.is_ip.toLowerCase() === "ip") ipNum++;
        else if (evacuee.is_ip.toLowerCase() === "not ip") nonIpNum++;
      }
    }
  }

  if (isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find((e) => e.id === residentId);
      if (evacuee) {
        if (evacuee.is_ip.toLowerCase() === "ip") ipNum++;
        else if (evacuee.is_ip.toLowerCase() === "not ip") nonIpNum++;
      }
    }
  }

  const data = [
    { name: "IP", count: ipNum },
    { name: "Non-IP", count: nonIpNum },
  ];

  return (
    <Flex direction={"row"} justify={"space-between"}>
      <Flex w={"100%"}>
        <Table colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Number</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Th>IP</Th>
              <Td>{ipNum}</Td>
            </Tr>
            <Tr>
              <Th>Non-IP</Th>
              <Td>{nonIpNum}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <Flex>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#BEE3F8" />
        </BarChart>
      </Flex>
    </Flex>
  );
};



export const SeniorReport = ({ startDate, endDate }) => {
  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const evacList = resEvacList().filter((entry) => {
    if (startDate && endDate) {
      const date = new Date(entry.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    }
    return true;
  });
  const evacueeList = EvacueeList();

  let seniorNum = 0;
  let nonseniorNum = 0;

  if (!isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find(
        (e) => e.id === residentId && e.barangay === userBarangay
      );
      if (evacuee) {
        if (evacuee.is_senior.toLowerCase() === "senior") seniorNum++;
        // else if (evacuee.is_senior.toLowerCase() === "not senior") nonseniorNum++;
      }
    }
  }

  if (isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find((e) => e.id === residentId);
      if (evacuee) {
        if (evacuee.is_senior.toLowerCase() === "senior") seniorNum++;
        // else if (evacuee.is_senior.toLowerCase() === "not senior") nonseniorNum++;
      }
    }
  }

  const data = [
    { name: "SENIOR", count: seniorNum },
    // { name: "NOT SENIOR", count: nonseniorNum },
  ];

  return (
    <Flex direction={"row"} justify={"space-between"}>
      <Flex w={"100%"}>
        <Table colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Number</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Th>SENIOR</Th>
              <Td>{seniorNum}</Td>
            </Tr>
            {/* <Tr>
              <Th>Not SENIOR</Th>
              <Td>{nonseniorNum}</Td>
            </Tr> */}
          </Tbody>
        </Table>
      </Flex>
      <Flex>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#BEE3F8" />
        </BarChart>
      </Flex>
    </Flex>
  );
};





export const AgeReport = ({ startDate, endDate }) => {
  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  let ageRange = {
    "0-5": 0,
    "6-10": 0,
    "11-20": 0,
    "21-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    "more than 60": 0,
  };

  const evacList = resEvacList().filter((entry) => {
    if (startDate && endDate) {
      const date = new Date(entry.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    }
    return true;
  });
  const evacueeList = EvacueeList();

  if (!isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      for (let j = 0; j < evacueeList.length; j++) {
        if (evacueeList[j].barangay === userBarangay) {
          if (evacueeList[j].id === residentId) {
            const dob = new Date(evacueeList[j].birthday);
            const age = new Date().getFullYear() - dob.getFullYear();

            if (age >= 0 && age <= 5) {
              ageRange["0-5"]++;
            } else if (age >= 6 && age <= 10) {
              ageRange["6-10"]++;
            } else if (age >= 11 && age <= 20) {
              ageRange["11-20"]++;
            } else if (age >= 21 && age <= 30) {
              ageRange["21-30"]++;
            } else if (age >= 31 && age <= 40) {
              ageRange["31-40"]++;
            } else if (age >= 41 && age <= 50) {
              ageRange["41-50"]++;
            } else if (age >= 51 && age <= 60) {
              ageRange["51-60"]++;
            } else if (age > 60) {
              ageRange["more than 60"]++;
            }

            break;
          }
        }
      }
    }
  }

  if (isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      for (let j = 0; j < evacueeList.length; j++) {
        if (evacueeList[j].id === residentId) {
          const dob = new Date(evacueeList[j].birthday);
          const age = new Date().getFullYear() - dob.getFullYear();

          if (age >= 0 && age <= 5) {
            ageRange["0-5"]++;
          } else if (age >= 6 && age <= 10) {
            ageRange["6-10"]++;
          } else if (age >= 11 && age <= 20) {
            ageRange["11-20"]++;
          } else if (age >= 21 && age <= 30) {
            ageRange["21-30"]++;
          } else if (age >= 31 && age <= 40) {
            ageRange["31-40"]++;
          } else if (age >= 41 && age <= 50) {
            ageRange["41-50"]++;
          } else if (age >= 51 && age <= 60) {
            ageRange["51-60"]++;
          } else if (age > 60) {
            ageRange["more than 60"]++;
          }

          break;
        }
      }
    }
  }

  const data = [
    { name: "0-5", value: ageRange["0-5"] },
    { name: "6-10", value: ageRange["6-10"] },
    { name: "11-20", value: ageRange["11-20"] },
    { name: "21-30", value: ageRange["21-30"] },
    { name: "31-40", value: ageRange["31-40"] },
    { name: "41-50", value: ageRange["41-50"] },
    { name: "51-60", value: ageRange["51-60"] },
    { name: "more than 60", value: ageRange["more than 60"] },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#DC143C",
    "#9400D3",
    "#8B008B",
    "#800000",
  ];

  return (
    <Flex direction={"row"} justify={"space-between"}>
      <Flex w={"100%"}>
        
        <Table variant="striped" colorScheme="blue">

          <Thead>
            <Tr>
              <Th>Age Range</Th>
              <Th>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(ageRange).map(([range, count]) => (
              <Tr key={range}>
                <Td>{range}</Td>
                <Td>{count}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <Flex w={"100%"} align={"center"}>
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => entry.name}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Flex>
    </Flex>
  );
};
