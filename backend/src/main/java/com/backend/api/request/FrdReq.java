/* 친구 신청 Form */
package com.backend.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class FrdReq {

    private Integer sendFrd; // 보낸 친구 id
    private Integer recvFrd; // 받은 친구 id
}
