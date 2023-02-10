package com.backend.api.controller;

import com.backend.api.service.FileUserService;
import com.backend.db.entity.FileUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
//@RequiredArgsConstructor
@RequestMapping("/api/file")
@CrossOrigin("*")
public class FileUserController {

    private final FileUserService fileUserService;

    @Autowired
    public FileUserController(FileUserService fileUserService){
        this.fileUserService = fileUserService;
    }

    //DB에 사진 올리기
    @PostMapping("/user/{userSequence}")
    public ResponseEntity<?> createBoard(@RequestParam("files")  List<MultipartFile> files,
                                         @PathVariable Integer userSequence) throws Exception {
        //기존에 있던 사진 DB에서 날리기
        System.out.println("======================================들어오긴 하냐?");
        System.out.println(files.size());
        fileUserService.deletePic(userSequence);

        fileUserService.addFile(userSequence, files);

        return ResponseEntity.ok().build();
    }

    //유저별 경로 받아오기
    @GetMapping("/user/{userSequence}")
    public String getBoard(@PathVariable Integer userSequence) {
        FileUser fileUser = fileUserService.findFileUser(userSequence).orElseThrow(RuntimeException::new);
        String imgPath = fileUser.getStoredFileName();
        log.info(imgPath);
        System.out.println(imgPath);
        return "<img src=" + imgPath + ">";
    }
}
