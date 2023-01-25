package com.backend.api.controller;

import com.backend.api.service.FileUserService;
import com.backend.db.entity.FileUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("file")
public class FileUserController {

    private final FileUserService fileUserService;

    @PostMapping("/user/{userSequence}")
    public ResponseEntity<?> createBoard(@RequestParam("files") List<MultipartFile> files,
                                         @PathVariable Integer userSequence) throws Exception {
        //기존에 있던 사진 DB에서 날리기
        fileUserService.deletePic(userSequence);

        System.out.println(files);
        fileUserService.addFile(userSequence, files);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userSequence}")
    public String getBoard(@PathVariable Integer userSequence) {
        FileUser fileUser = fileUserService.findFileUser(userSequence).orElseThrow(RuntimeException::new);
        String imgPath = fileUser.getStoredFileName();
        log.info(imgPath);
        System.out.println(imgPath);
        return "<img src=" + imgPath + ">";
    }
}
