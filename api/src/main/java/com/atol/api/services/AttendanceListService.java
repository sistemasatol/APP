package com.atol.api.services;

import com.atol.api.models.AttendanceList;
import com.atol.api.repositories.AttendanceListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceListService {

    @Autowired
    private AttendanceListRepository attendanceListRepository;

    public List<AttendanceList> getAllAttendanceLists() {
        return attendanceListRepository.findAll();
    }

    public Optional<AttendanceList> getAttendanceListById(Long id) {
        return attendanceListRepository.findById(id);
    }

    public AttendanceList createAttendanceList(AttendanceList attendanceList) {
        return attendanceListRepository.save(attendanceList);
    }

    public AttendanceList updateAttendanceList(Long id, AttendanceList attendanceList) {
        attendanceList.setId(id);
        return attendanceListRepository.save(attendanceList);
    }

    public void deleteAttendanceList(Long id) {
        attendanceListRepository.deleteById(id);
    }

}
