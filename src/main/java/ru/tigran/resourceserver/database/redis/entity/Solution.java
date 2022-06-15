package ru.tigran.resourceserver.database.redis.entity;

import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash("Solution")
public class Solution implements Serializable {
    private String id;
    private String code;
    private int taskId;
    private String language;
    private Integer plagiarism = -1;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getLanguage() {
        return language;
    }

    public String getLanguageName() {
        switch (language){
            case "cpp": return "C++";
            case "java": return "Java";
            case "csharp": return "C#";
        }
        return "Unknown";
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getPlagiarism() {
        return plagiarism;
    }

    public void setPlagiarism(Integer plagiarism) {
        this.plagiarism = plagiarism;
    }
}
