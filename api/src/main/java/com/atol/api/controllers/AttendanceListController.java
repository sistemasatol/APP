package com.atol.api.controllers;

import com.atol.api.models.AttendanceList;
import com.atol.api.services.AttendanceListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/attendanceLists")
@RestController
public class AttendanceListController {
    @Autowired
    private AttendanceListService attendanceListService;

    @GetMapping
    public List<AttendanceList> getAllEmployees() {
        return attendanceListService.getAllAttendanceLists();
    }


    @GetMapping("/{id}")
    public Optional<AttendanceList> getEmployeeByWorkId(@RequestParam Long id) {
        return attendanceListService.getAttendanceListById(id);
    }

    @PostMapping
    public ResponseEntity<AttendanceList> createEmployee(@RequestBody AttendanceList attendanceList) {
        AttendanceList createdAttendanceList = attendanceListService.createAttendanceList(attendanceList);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAttendanceList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceList> updateEmployee(@PathVariable Long id, @RequestBody AttendanceList attendanceList) {
        return ResponseEntity.ok(attendanceListService.updateAttendanceList(id, attendanceList));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        attendanceListService.deleteAttendanceList(id);
        return ResponseEntity.noContent().build();
    }

}
