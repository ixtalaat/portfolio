---
title: "Single Responsibility Principle بالعربي"
description: "مسؤولية واحدة سبب واحد لتغيير"
dateString: Oct 2023
draft: false
tags: ["SOLID", "SRP"]
weight: 106
cover:
    image: "/blog/srp-arabic/cover.png"
    # caption: "Single Responsibility Principle"
---



<div dir="rtl" lang="ar">
فى عالم software development لازم تلتزم بمبادئ SOLID، عشان تقدر تكتب كود maintainable و flexible و reusable، وكل حرف من حروف مبادئ SOLID بيكون اختصار لمبدأ منهم

## أى هو SRP ؟

انهارده هكلمك عن أول مبدأ من مبادئ SOLID وهو مبدأ Single Responsibility Principle، نص المبدأ دا بيقول أن كل Class لازم يكون له مسؤولية Responsibility واحدة بس ويكون فيها سبب واحد بس للتعديل وتغيير عليه.

> Classes should have a single responsibility and thus only a single reason to change.
>

ومادام Class عنده مسؤولية واحدة فأكيد هيكون فى سبب واحد بس لتغيير، ودا هيقلل التعقيد Complexity فى الكود ويخليه سهل الفهم و الصيانة

وبغض النظر عن عدد Methods جواه Class لازم يكونوا بيخدموا غرض واحد ومسؤولية واحدة وهدف واحد.

طب ليه أقلق لو Class عنده أكتر من Responsibility أو Functionality وليه لازم أفصلهم عن بعض ؟

هقول أنا ليه

مثلا لو عندى سبيبين عشان أعدل فى Class فلازم أقسم Functionality لكلاسين اتنين، عشان لو عندى أكتر من Functionality واحدة فى Class دا هيخلى فيه Coupling بين Functionalities الكتير اللى فى الكلاس , فلو هغير فى واحدة منهم ممكن يبقا فيه فرصة يحصل كسر للاقتران بين وظفتين Broke Coupling Functionality فى Class.

عشان كدا لازم أخلى الكلاس عنده مسؤولية واحدة والكلاس ساعتها يبقا More Cohesive و يقل Coupling.

مثال على الماشي كدا لو أنا عندى كلاس بيرجع داتا من Database و بيعرضها لل User فالحالة دى الكلاس عندي عنده مسؤليتين الأولى Retrieve الداتا من Database و التانية Display الداتا، فهنا لازم أقسم الكلاس ل كلاسين الأول عشان retrieve الداتا بس و التانى display داتا بس

## ليه بحتاج أطبق SRP ؟

وأنا بتطور أو ببنى اى Application او Project بيكون عندى Features او Functionalities اللى Project بيقدمها واللى اقدر اقول عليها Responsibilities ، فبقسم ال Application ل Modules او Classes عشان أوزع المسؤليات دي بحيث يبقا Project سهل القراءة Readable والفهم Understandable و يكون قابل للصيانة Maintainable فى أى وقت و كمان بيكون قابل للاختبار Testable ودا عشان كل Class بيكون له Methods الخاصة به فيكون من السهل أنى أعمل عليها Unit Tests.

## مثال ب #C

لو عندى مثلا كلاس زى دا

```csharp
class Customer
{
    public string Name { get; set; }
    public string Email { get; set; }

    public bool Validate()
    {
        // Valid if the customer is valid
    }

    public void Save()
    {
        // Save the customer in the database
    }
}
```

أبص وأشوف هل كلاس Customer  ينفع تكون مسؤليته Validate أو Save هنا بقا أشغل الانذار وأطبق SRP وأقسم Responsibilities.

ف ال Customer Class يبقا فيه بس Information بتاعت Customer ، وValidation هنقله فى كلاس لوحده ،وحفظ Customer فى Database فى كلاس لوحده  

```csharp
class CustomerValidator
{
    public bool Validate(Customer customer)
    {
        // Valid if the client is valid
    }
}

class CustomerRepository
{
    public void Save(Customer customer)
    {
        // Save the customer in the database
    }
}

class Customer
{
    public string Name { get; set; }
    public string Email { get; set; }
}
```

<div>
