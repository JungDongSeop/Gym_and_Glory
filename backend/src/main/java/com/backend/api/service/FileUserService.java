package com.backend.api.service;

import com.backend.db.entity.FileUser;
import com.backend.db.entity.User;
import com.backend.db.repository.FileUserRepository;
import com.backend.db.repository.UserRepository;
import com.backend.util.FileHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FileUserService {

    private final FileUserRepository fileUserRepository;
    private final FileHandler fileHandler;

    @Autowired
    public FileUserService(FileUserRepository fileUserRepository,FileHandler fileHandler){
        this.fileUserRepository = fileUserRepository;
        this.fileHandler = fileHandler;
    }

    public void addFile(Integer userSequence, List<MultipartFile> files) throws Exception{
        System.out.println("여기서 파일 크기"+ files.size());
        List<FileUser> list = fileHandler.parseFileInfo(userSequence,files);
        if(list.isEmpty()){
            return;
        }else{
            List<FileUser> pictureBeans= new ArrayList<>();
            for(FileUser fileUsers : list){
                pictureBeans.add(fileUserRepository.save(fileUsers));
            }
        }
    }

    public List<FileUser> findFileUser(){
        return fileUserRepository.findAll();
    }

    public Optional<FileUser> findFileUser(Integer userSequence) {
        return fileUserRepository.findByUserSequence(userSequence);
    }

    @Transactional
    public void deletePic(Integer userSequence) {
        System.out.println("파일 유저 삭제에 들어왔어 ");
        FileUser fileUser = fileUserRepository.findById(userSequence).orElse(null);
        System.out.println("여 오나?");
        if(fileUser!=null){
            System.out.println("널 값이야");
            fileUserRepository.deleteByUserSequence(userSequence);
        }
    }
}
