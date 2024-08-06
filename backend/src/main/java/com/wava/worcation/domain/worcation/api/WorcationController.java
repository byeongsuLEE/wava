// src/main/java/com/worq/worcation/domain/worcation/api/WorcationController.java
package com.wava.worcation.domain.worcation.api;

import com.wava.worcation.domain.worcation.application.WorcationService;
import com.wava.worcation.domain.worcation.dto.WorcationRequestDto;
import com.wava.worcation.domain.worcation.dto.WorcationResponseDto;
import com.wava.worcation.domain.worcation.exception.WorcationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/worcation")
public class WorcationController {

    @Autowired
    private WorcationService worcationService;

    @PostMapping("/create")
    public ResponseEntity<?> createWorcation(@RequestBody WorcationRequestDto worcationRequestDto) {
        try {
            WorcationResponseDto response = worcationService.createWorcation(worcationRequestDto);
            return ResponseEntity.ok(response);
        } catch (WorcationNotFoundException e) {
            return ResponseEntity.status(400).body("존재하지 않는 워케이션 입니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("일시적인 오류가 발생하였습니다. 다시 시도해주세요.");
        }
    }

    @PatchMapping("/update/{worcationid}")
    public ResponseEntity<?> getAllWorcations(@PathVariable Long worcationid ,@RequestBody WorcationRequestDto worcationRequestDto) {
        try{
            WorcationResponseDto responseDto = worcationService.updateWorcation(worcationid,worcationRequestDto);
            return ResponseEntity.ok(responseDto);
        } catch (WorcationNotFoundException e) {
            return ResponseEntity.status(400).body("존재하지 않는 워케이션 입니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("일시적인 오류가 발생하였습니다. 다시 시도해주세요.");
        }
    }

    @DeleteMapping("/delete/{worcationid}")
    public ResponseEntity<?> getAllWorcations(@PathVariable Long worcationid) {
        try{
            worcationService.deleteWorcation(worcationid);
            return ResponseEntity.ok().build();
        } catch (WorcationNotFoundException e) {
            return ResponseEntity.status(400).body("존재하지 않는 워케이션 입니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("일시적인 오류가 발생하였습니다. 다시 시도해주세요.");
        }
    }
}
