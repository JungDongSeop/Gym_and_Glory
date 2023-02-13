package com.backend.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.google.api.client.util.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {
//    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey="AKIAT6FRPDLDWWLTBEE2";

//    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey="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";

    @Value("${cloud.aws.region.static}")
    private String region="ap-northeast-2";

    @Bean
    public AmazonS3Client amazonS3Client() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }
}