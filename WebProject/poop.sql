
CREATE TABLE StudentExams (
	studentId	INT	 		FORIEGN KEY			REFERENCES Student(studentId),
    examID		INT			FORIEGN KEY			REFERENCES Exams(examId),
    grade		INT			NOT NULL			DEFAULT(-1),
    teacherMUID CHAR(10)	NOT NULL,
    PRIMARY KEY(studentId, examId)
)

SET NOCOUNT ON
    Declare @Id int = 1
    Declare @Idd int = 1
    While @Id <= 100 Begin
    	While @Idd <= 4 Begin
       	Insert Into StudentExams (studentID, examID, grade, teacherMUID)
       	values (
          CAST(@Id as INT), CAST (@Idd as INT), -1, 'stahrm'
       	)
       	SET @idd = @idd + 1
        End
       SET @Id = @Id + 1
    End
