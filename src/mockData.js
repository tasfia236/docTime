export const mockData = {
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      availability: "Mon-Fri: 9AM-5PM"
    },
    {
      id: 2,
      name: "Dr. James Patel",
      specialty: "Neurologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      availability: "Tue-Sat: 10AM-6PM"
    },
    {
      id: 3,
      name: "Dr. Linda Moore",
      specialty: "Dermatologist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
      availability: "Mon-Wed: 8AM-4PM"
    },
    {
      id: 4,
      name: "Dr. Michael Smith",
      specialty: "Pediatrician",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
      availability: "Mon-Fri: 9AM-5PM"
    },
    {
      id: 5,
      name: "Dr. Aisha Khan",
      specialty: "Gynecologist",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop",
      availability: "Tue-Sat: 10AM-6PM"
    }
  ],
  schedules: [
    {
      doctorId: 4,
      doctorName: "Dr. Michael Smith",
      specialty: "Pediatrician",
      date: "Mon Nov 6th",
      slots: ["9:00 am", "3:00 pm", "10:00 am", "3:00 pm", "6:00 pm", "6:00 pm"]
    },
    {
      doctorId: 5,
      doctorName: "Dr. Aisha Khan",
      specialty: "Gynecologist",
      date: "Mon Nov 6th",
      slots: ["9:00 am", "3:00 pm", "3:00 pm", "3:00 pm", "6:00 pm", "6:00 pm"]
    },
    {
      doctorId: 4,
      doctorName: "Dr. Michael Smith",
      specialty: "Pediatrician",
      date: "Properties Schedule",
      slots: ["9:00 am", "3:00 pm", "10:00 pm", "6:00 pm", "3:00 pm", "1:00 pm"]
    }
  ],
  appointments: [
    {
      id: 1,
      patientName: "John Meyer",
      doctorId: 1,
      date: "2024-01-15",
      time: "10:00 am",
      status: "Confirmed",
      reason: "Regular Checkup"
    },
    {
      id: 2,
      patientName: "Anna Smith",
      doctorId: 2,
      date: "2024-01-16",
      time: "2:00 pm",
      status: "Pending",
      reason: "Consultation"
    }
  ],
  patients: [
    {
      id: 1,
      name: "Dr. Jake Myers",
      email: "jakemyers@email.com",
      phone: "555-0123-456789",
      location: "California",
      status: "ER PM Routine"
    },
    {
      id: 2,
      name: "Dr. Aaron Smith",
      email: "aaronsmith@email.com",
      phone: "555-9876-543210",
      location: "New York",
      status: "Need A Survey"
    },
    {
      id: 3,
      name: "Dr. Linda Moore",
      email: "lindamoore@email.com",
      phone: "555-1122-334455",
      location: "Texas",
      status: "ER PM Routine"
    }
  ],
  todaySchedule: [
    {
      id: 1,
      patientName: "Theoen S Nawish",
      reason: "3 Los mana's",
      status: "Booked",
      time: "6:00 pm"
    },
    {
      id: 2,
      patientName: "Theoen S Nowish + lorem 1",
      reason: "3 Los mana",
      status: "Booked",
      time: "6:00 pm"
    },
    {
      id: 3,
      patientName: "Theoen S Nowish + lorem 2 loremlorem 1",
      reason: "",
      status: "Booked",
      time: "6:00 pm"
    }
  ],
  upcomingAppointments: [
    { time: "10:00 pm", type: "Sunset Sheraton", date: "12:00 pm" },
    { time: "10:00 pm", type: "Sunset Sheraton", date: "12:00 pm" },
    { time: "10:00 pm", type: "Sunset Sheraton", date: "10:00 pm" }
  ]
};