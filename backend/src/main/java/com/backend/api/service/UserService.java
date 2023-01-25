package com.backend.api.service;

import com.backend.api.request.SignUpReq;
import com.backend.db.entity.FileUser;
import com.backend.db.entity.User;
import com.backend.db.repository.UserRepository;
import com.backend.util.FileHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final FileHandler fileHandler;
    @Autowired
    public UserService(UserRepository userRepository,FileHandler fileHandler) {
        this.userRepository = userRepository;
        this.fileHandler = fileHandler;
    }


    @Transactional
    public User signup(final SignUpReq signUpReq) throws UnknownHostException {

//        if (userRepository.findOneWithRolesByEmail(signUpReq.getEmail()).orElse(null) != null) {
//            throw new EmailDuplicateException(signUpReq);
//        }
//
//        Role role = Role.builder()
//                .roleId(1)
//                .roleName("ROLE_USER")
//                .build();
//
//        String authKey = mailService.sendAuthMail(signUpReq.getEmail(), signUpReq.getNickname());
//        int imgNum = (int) (Math.random()*25 + 1);
//
        User user = User.builder()
                .email(signUpReq.getEmail())
                .password(signUpReq.getPassword())
                .nickname(signUpReq.getNickname())
                .gender(signUpReq.getGender())
                .telNumber(signUpReq.getTelNumber())
                .build();
        //사진이 들어올 경우
        //작업 넣어주고 userSeuqence빼주고 사진을 넣어주면
        //imgpath sequnce바탕으로 경로 짜줘야함
        return userRepository.save(user);
    }

    public void addPicture(Integer userSequence, List<MultipartFile> files) throws Exception{
        List<FileUser> list = fileHandler.parseFileInfo(userSequence, files);
        if (list.isEmpty()){
            // TODO : 파일이 없을 땐 어떻게 해야할까.. 고민을 해보아야 할 것
        }
        // 파일에 대해 DB에 저장하고 가지고 있을 것
        else{
            List<FileUser> pictureBeans = new ArrayList<>();
            for (FileUser fileUsers : list) {
                pictureBeans.add(userRepository.save(fileUsers));
            }
        }
    }


    public User findUserByEmail(String email) {
        User user = userRepository.findOneByEmail(email);
        return user;
    }

    public Boolean checkDuplicateEmail(String email){
        System.out.println(userRepository.findAllByEmail(email).size());
        if(userRepository.findAllByEmail(email).size() > 0) {
            System.out.println("dkdkdk");
            return false;
        }
        return true;
    }

    public boolean checkDuplicateNickname(String nickname) {
        if(userRepository.
                findAllByNickname(nickname).size() > 0) {
            return false;
        }
        return true;
    }


    @Transactional
    public void deleteUser(int userSequence) {
        System.out.println(userSequence);
        userRepository.deleteByUserSequence(userSequence);
    }
}
